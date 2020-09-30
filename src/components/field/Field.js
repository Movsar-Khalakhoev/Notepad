import {Component} from '../../core/Component'
import {fieldTemplate} from './field.template'
import {$} from '../../core/dom'
import {changeField} from './field.functions'
import {storage} from '../../core/storage'

export class Field extends Component {
	static className = '.right__field'

	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'Field',
			listeners: ['input'],
			...options
		})
		this.parentClass = '.right'
	}

	init() {
		super.init()

		changeField(this.$componentRoot, this.notes, this.activeNote)

		this.$on('notesPanel:addNote', () =>
		changeField(this.$componentRoot, this.notes, this.activeNote))

		this.$on('notesContainer:changedActiveNote', () =>
		changeField(this.$componentRoot, this.notes, this.activeNote))

		this.$on('notesContainer:deleteNote', () =>
		changeField(this.$componentRoot, this.notes, this.activeNote))

		this.$on('notesPanel:changeNotesStack', () =>
		changeField(this.$componentRoot, this.notes, this.activeNote))
	}

	toHTML() {
		const layout = fieldTemplate()
		$(this.parentClass).html(layout, 'add')
	}

	onInput(event) {
		this.notes[this.activeNote.numb].inner = event.target.textContent
		storage('notes', this.notes)
	}
}
