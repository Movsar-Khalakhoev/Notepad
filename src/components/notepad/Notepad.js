import {$} from '../../core/dom'
import {notepadTemplate} from './notepad.template'

export class Notepad {
	constructor($appRoot, options) {
		this.$appRoot = $appRoot,
		this.components = options.components || []
	}

	prepare() {
		const baseLayout = notepadTemplate()
		$(this.$appRoot).html(baseLayout)
	}

	render() {
		this.prepare()
		this.components = this.components.map(Component => {
			const $componentRoot = Component.className
			const component = new Component($componentRoot)
			component.toHTML()

			return component
		})

		this.components.forEach(component => component.init())
	}
}
