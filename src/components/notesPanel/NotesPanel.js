import {Component} from '../../core/Component'
import {$} from '../../core/dom'
import {notesPanelTemplate} from './notesPanel.template'
import {addTagList} from './notesPanel.functions'

export class NotesPanel extends Component {
	static className = '.left__panel'
	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'NotesPanel',
			listeners: ['click', 'change'],
			...options
		}),
		this.parentClass = '.left'
	}

	init() {
		super.init()

		addTagList(this.$componentRoot, this.tags)
	}

	toHTML() {
		const layout = notesPanelTemplate()
		$(this.parentClass).html(layout)
	}

	onClick(event) {
		const target = $(event.target)
		switch (target.data('el')) {
			case 'addNote':
				this.$emit('notesPanel:addNote')
		}
	}

	onChange(event) {
		const target = $(event.target)
		switch (target.data('el')) {
			case 'notesPanelTags':
				this.$emit('notesPanel:changeNotesStack', target.$el.value)
		}
	}
}
