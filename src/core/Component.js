import {DomListener} from './DomListener'
import {$} from './dom'

export class Component extends DomListener {
	constructor($componentRoot, options) {
		super($componentRoot, options.listeners)

		this.$componentRoot = $componentRoot
		this.name = options.name
		this.emitter = options.emitter
		this.notes = options.notes
		this.activeNote = options.activeNote
		this.currentActiveNote = options.currentActiveNote
		this.tags = options.tags
		this.filter = options.filter
	}

	toHTML() {
		return ''
	}

	$emit(eventName, ...args) {
		this.emitter.emit(eventName, ...args)
	}

	$on(eventName, func) {
		this.emitter.subscribe(eventName, func)
	}

	init() {
		this.$componentRoot = $(this.$componentRoot)

		this.initDOMListeners()

		window.activeNote = this.activeNote
		window.currentActiveNote = this.currentActiveNote
	}
}
