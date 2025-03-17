import { useEffect, useRef } from 'react'

interface useIntersectionObserver {
	onView?: () => void
	onHide?: () => void
	options?: IntersectionObserverInit
}
export const useIntersectionObserver = <T extends HTMLElement>(
	{ onView, onHide, options = { threshold: 0.1 } }: useIntersectionObserver,
	deps: unknown[],
) => {
	const ref = useRef<T | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entries]) => {
			if (entries?.isIntersecting) return onView?.()
			return onHide?.()
		}, options)

		const target = ref.current

		if (target) {
			observer.observe(target)
		}

		return () => {
			if (target) {
				observer.unobserve(target)
			}
		}
	}, [onHide, onView, options, deps])

	return ref
}
