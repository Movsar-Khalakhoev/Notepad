import {Component} from '../../core/Component'
import {noteInfoTemplate} from './noteInfo.template'
import {$} from '../../core/dom'
import {addTagsList, changeInfoInNoteInfo} from './noteInfo.functions'
import {storage} from '../../core/storage'

export class NoteInfo extends Component {
	static className = '.right__info'
	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'NoteInfo',
			listeners: ['input', 'click'],
			...options
		})
		this.parentClass = '.right'
	}

	init() {
		super.init()

		changeInfoInNoteInfo(
			this.$componentRoot.$el,
			this.notes,
			this.activeNote,
			this.tags
		)

		addTagsList(
			this.$componentRoot.$el,
			this.notes,
			this.activeNote,
			this.tags
		)

		this.$on('notesContainer:changedActiveNote', () => {
						changeInfoInNoteInfo(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
						addTagsList(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
					})
		this.$on('notesPanel:addNote', () => {
						changeInfoInNoteInfo(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
						addTagsList(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
					})
		this.$on('notesContainer:deleteNote', () => {
						changeInfoInNoteInfo(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
						addTagsList(
							this.$componentRoot.$el,
							this.notes,
							this.activeNote,
							this.tags
						)
					})
		this.$on('notesPanel:changeNotesStack', () => {
			changeInfoInNoteInfo(
				this.$componentRoot.$el,
				this.notes,
				this.activeNote,
				this.tags
			)
			addTagsList(
				this.$componentRoot.$el,
				this.notes,
				this.activeNote,
				this.tags
			)
		})
	}

	toHTML() {
		const layout = noteInfoTemplate()
		$(this.parentClass).html(layout, 'add')
	}

	onInput(event) {
		this.notes[this.activeNote.numb].title = event.target.textContent
		storage('notes', this.notes)
		this.$emit('noteInfo:changeTitle', event.target.textContent)
	}

	onClick(event) {
		if (!this.activeNote.numb) return
		const target = $(event.target)
		const notes = this.notes[this.activeNote.numb].noteTags

		switch (target.data('el')) {
			case 'noteInfoTag':
				notes.push(target.data('value'))
				changeInfoInNoteInfo(
					this.$componentRoot.$el,
					this.notes,
					this.activeNote,
					this.tags
				)
				addTagsList(
					this.$componentRoot.$el,
					this.notes,
					this.activeNote,
					this.tags
				)
				storage('notes', this.notes)
				this.$emit('noteInfo:addTag', target.data('value'))
				break
			case 'tagDelete':
				notes.splice(notes.indexOf(target.data('value')), 1)
				changeInfoInNoteInfo(
					this.$componentRoot.$el,
					this.notes,
					this.activeNote,
					this.tags
				)
				addTagsList(
					this.$componentRoot.$el,
					this.notes,
					this.activeNote,
					this.tags
				)
				storage('notes', this.notes)
				this.$emit('noteInfo:deleteTag', target.data('value'))
		}
	}
}
