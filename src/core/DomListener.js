import {functionName} from './utils'
import {$} from './dom'

export class DomListener {
	constructor($componentRoot, listeners) {
		this.$componentRoot = $componentRoot
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
			$(this.$componentRoot).on(listener, this[method])
		})

		setTimeout(this.removeDOMListeners.bind(this), 3000)
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = functionName(listener)
			$(this.$componentRoot).off(listener, this[method])
		})
	}
}
