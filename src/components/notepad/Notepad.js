import {$} from '../../core/dom'
import {Emitter} from '../../core/Emitter'
import {storage} from '../../core/storage'
import {defaultTags} from './notepad.defaultTags'
import {notepadTemplate} from './notepad.template'

export class Notepad {
	constructor($appRoot, options) {
		this.$appRoot = $appRoot,
		this.components = options.components || []
		this.emitter = new Emitter,
		this.notes = storage('notes') || []
		this.activeNote = storage('activeNote') || {}
		this.currentActiveNote = storage('currentActiveNote') || {}
		this.tags = storage('tags') || defaultTags
		this.filter = {value: null}
	}

	prepare() {
		if (!storage('notes')) {
			storage('notes', [])
		}
		const baseLayout = notepadTemplate()
		$(this.$appRoot).html(baseLayout)
	}

	render() {
		this.prepare()
		const options = {
			emitter: this.emitter,
			notes: this.notes,
			activeNote: this.activeNote,
			currentActiveNote: this.currentActiveNote,
			tags: this.tags,
			filter: this.filter
		}

		this.components = this.components.map(Component => {
			const $componentRoot = Component.className
			const component = new Component($componentRoot, options)
			component.toHTML()

			return component
		})

		this.components.forEach(component => component.init())
	}
}
