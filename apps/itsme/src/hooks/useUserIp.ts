'use client'

import { useCallback, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/modules/api/trpc/client'

type Options = {
	onSuccess?: () => void
	onError?: () => void
}

export const useUserIp = () => {
	const [isExceeded, setIsExceeded] = useState(false)

	const trpc = useTRPC()

	const { data: ipData } = useQuery(
		trpc.getIP.queryOptions(undefined, {
			staleTime: Infinity,
			gcTime: Infinity,
		}),
	)

	const ip = ipData?.ip || ''

	const ipUsageQuery = useQuery(
		trpc.getIpUsage.queryOptions(
			{ ip },
			{
				enabled: !!ip,
			},
		),
	)

	const addIpCountMutate = useMutation(trpc.addIpCount.mutationOptions())

	const addIpCount = async (data: { ip: string }, options: Options = {}) => {
		try {
			await addIpCountMutate.mutateAsync({ ip: data.ip })
			ipUsageQuery.refetch()
			options.onSuccess?.()
		} catch (err) {
			options.onError?.()
		}
	}
	const checkMaxLimit = async (): Promise<boolean> => {
		const isExceeded = ipUsageQuery.data?.isMax ?? false
		if (isExceeded) setIsExceeded(true)

		return isExceeded
	}

	const resetIsExceeded = useCallback(() => setIsExceeded(false), [])

	return {
		maxCount: 50,
		state: {
			ip,
			count: ipUsageQuery.data?.count || 0,
			isExceeded,
			isLoading: ipUsageQuery.isLoading,
		},
		handler: {
			refetchIpUsage: ipUsageQuery.refetch,
			addIpCount,
			checkMaxLimit,
			resetIsExceeded,
		},
	}
}
