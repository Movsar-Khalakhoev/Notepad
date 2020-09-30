export class Emitter {
	constructor() {
		this.listeners = {}
	}

	emit(eventName, ...args) {
		if (!this.listeners[eventName]) {
			return false
		} else {
			this.listeners[eventName].forEach(func => func(...args))
		}
	}

	subscribe(eventName, func) {
		this.listeners[eventName] = this.listeners[eventName] || []
		this.listeners[eventName].push(func)

		return () => {
			this.listeners[eventName] =
			this.listeners[eventName].filter(listener => listener !== func)
		}
	}
}
