'use client'

import { useMemo, useRef, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

import { useTRPC } from '@/modules/api/trpc/client'

type Options = {
	onSuccess?: () => void
	onError?: () => void
}

export const useUserIp = () => {
	const fallbackIpRef = useRef(uuidv4())
	const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)

	const trpc = useTRPC()

	const { data: ipData } = useQuery(
		trpc.getIP.queryOptions(undefined, {
			staleTime: Infinity,
			gcTime: Infinity,
		}),
	)

	const ip = useMemo(() => ipData?.ip || fallbackIpRef.current, [ipData?.ip])

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
		const isLimited = ipUsageQuery.data?.isMax ?? false
		setIsLimitModalOpen(isLimited)

		return isLimited
	}

	return {
		maxCount: 50,
		state: {
			ip,
			count: ipUsageQuery.data?.count || 0,
			isLimitModalOpen,
			isLoading: ipUsageQuery.isLoading,
		},
		handler: {
			refetchIpUsage: ipUsageQuery.refetch,
			addIpCount,
			checkMaxLimit,
			setIsLimitModalOpen,
		},
	}
}
