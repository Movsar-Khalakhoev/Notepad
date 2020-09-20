import {DomListener} from './DomListener';

export class Component extends DomListener {
	constructor($componentRoot, options) {
		super($componentRoot, options.listeners)

		this.name = options.name
	}

	toHTML() {
		return ''
	}

	init() {
		this.initDOMListeners()
	}
}
