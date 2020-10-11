import {Component} from '../../core/Component'
import {noteToolbarTemplate} from './noteToolbar.template'
import {$} from '../../core/dom'
import {changeToolsState, resetToolsState} from './noteToolbar.functions'

export class NoteToolbar extends Component {
	static className = '.right__toolbar'

	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'NoteToolbar',
			listeners: ['click'],
			...options
		}),
		this.parentClass = '.right'
	}

	toHTML() {
		const layout = noteToolbarTemplate()
		$(this.parentClass).html(layout, 'add')
	}

	init() {
		super.init()

		this.$on('field:selectedText', state =>
		changeToolsState(state, this.$componentRoot))

		this.$on('notesContainer:changedActiveNote', () =>
		resetToolsState(this.$componentRoot))

		this.$on('notesContainer:deleteNote', () =>
		resetToolsState(this.$componentRoot))

		this.$on('notesPanel:addNote', () =>
		resetToolsState(this.$componentRoot))

		this.$on('notesPanel:changeNotesStack', () =>
		resetToolsState(this.$componentRoot))
	}

	onClick(event) {
		const target = $(event.target)
		const tool = target.data('el')
		if (!tool) return
		const isActive = !!target.closest('[data-toolactive]').$el
		resetToolsState(this.$componentRoot)
		this.$emit('noteToolbar:clickOnTool', tool, isActive)
	}
}
