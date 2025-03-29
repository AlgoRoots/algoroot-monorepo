import { useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/modules/api/trpc/client'

type Options = {
	onSuccess?: () => void
	onError?: () => void
}

export const useUserIp = () => {
	const [hasExceededLimit, setHasExceededLimit] = useState(false)

	const trpc = useTRPC()
	const { data } = useQuery(
		trpc.getIP.queryOptions(undefined, {
			staleTime: Infinity,
			gcTime: Infinity,
		}),
	)

	const addIpCountMutation = useMutation(
		trpc.addIpCount.mutationOptions({
			onError: (err) => {
				if (err.data?.code === 'BAD_REQUEST') {
					setHasExceededLimit(true)
				}
			},
		}),
	)
	const resetLimitState = () => setHasExceededLimit(false)

	const addIpCount = async (data: { ip: string }, options: Options) => {
		addIpCountMutation
			.mutateAsync({ ip: data?.ip || '' })
			.then(options?.onSuccess)
			.catch(options?.onError)
	}

	return {
		ip: data?.ip,
		addIpCount,
		hasExceededLimit,
		resetLimitState,
	}
}
