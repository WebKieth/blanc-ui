type TEventsMap = Array<(...args: unknown[]) => void>
type TEventName = string
export const $eventBus = '$ebus'
export class EventBus {
	bus: Map<TEventName, TEventsMap>
	constructor() {
		this.bus = new Map()
	}

	$un(id: TEventName, callback: (...args: unknown[]) => void) {
		if (!this.bus.has(id)) return
		const listeners = this.bus.get(id)
		if (listeners === undefined) return
		this.bus.set(
			id,
			listeners.filter((listener) => listener !== callback),
		)
	}

	$on(id: TEventName, callback: (...args: unknown[]) => void) {
		const callbacks = this.bus.get(id)
		if (callbacks === undefined) {
			this.bus.set(id, [callback])
		} else {
			this.bus.set(id, [callback, ...callbacks])
		}
	}

	$emit(id: TEventName, ...params: unknown[]) {
		const callbacks = this.bus.get(id)
		if (callbacks === undefined) return
		callbacks.forEach((cb) => cb(...params))
	}
}
