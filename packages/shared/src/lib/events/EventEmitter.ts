export type Listener<T extends any[]> = (...payload: T) => void

export class EventEmitter<E extends Record<string, Listener<any[]>>> {
	private events: Map<keyof E, Set<E[keyof E]> | E[keyof E]>

	constructor() {
		this.events = new Map()
	}

	/**
	 * 리스너 등록 (단일 리스너 or 여러 개 지원)
	 */
	on<K extends keyof E>(key: K, listener: E[K], single = false) {
		console.log('@@@@on', key, [...this.events])

		if (single) {
			this.events.set(key, listener)
		} else {
			if (!this.events.has(key)) {
				this.events.set(key, new Set())
			}
			const eventSet = this.events.get(key)
			if (eventSet instanceof Set) {
				eventSet.add(listener)
			}
		}
		return () => {
			this.off(key, listener)
		}
	}

	/**
	 * 한번만 실행되는 리스너
	 * 실행 후 off 호출해 삭제시킴
	 */
	once<K extends keyof E>(key: K, listener: E[K]) {
		const onceListener: E[K] = ((...payload: Parameters<E[K]>) => {
			listener(...payload)
			this.off(key, onceListener)
		}) as E[K]

		this.on(key, onceListener, true)
	}

	/**
	 * 특정 리스너 삭제
	 */
	off<K extends keyof E>(key: K, listener?: E[K]) {
		if (!this.events.has(key)) return

		const event = this.events.get(key)

		if (event instanceof Set) {
			if (listener) {
				event.delete(listener)
			}
			if (event.size === 0) {
				this.events.delete(key)
			}
		} else {
			this.events.delete(key)
		}
	}

	/**
	 * 등록된 이벤트 실행 , clear를 리턴함
	 */
	emit<K extends keyof E>(
		key: K,
		...payload: Parameters<E[K]> extends [] ? [] : Parameters<E[K]>
	) {
		console.log([...this.events])

		console.log('key', key)
		const event = this.events.get(key)

		if (!event) return

		if (event instanceof Set) {
			event.forEach((l) => l(...(payload as any)))
		} else {
			event(...(payload as any))
		}
	}

	/**
	 * 특정 이벤트 삭제
	 */
	clear<K extends keyof E>(key: K) {
		this.events.delete(key)
	}

	/**
	 * 모든 이벤트 삭제
	 */
	clearAll() {
		this.events.clear()
	}
}
