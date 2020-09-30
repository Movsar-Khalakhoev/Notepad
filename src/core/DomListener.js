import {functionName} from './utils'

export class DomListener {
	constructor($componentRoot, listeners) {
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = functionName(listener)
			if (!this[method]) {
				const name = this.name || ''
				const error = `Method "${method}" does not exist in "${name}" component`
				throw new Error(error)
			}
			this[method] = this[method].bind(this)
			this.$componentRoot.on(listener, this[method])
		})
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = functionName(listener)
			this.$componentRoot.off(listener, this[method])
		})
	}
}
