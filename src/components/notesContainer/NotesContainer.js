import {Component} from '../../core/Component'
import {$} from '../../core/dom'
import {
	changeNoteTags,
	changeTitleOnNotesContainer,
	createNote,
	existsActiveNote,
	isActiveNote,
	nowDate,
	renderNotes
} from './notesContainer.functions'
import {notesContainerTemplate} from './notesContainer.template'
import {storage} from '../../core/storage'

export class NotesContainer extends Component {
	static className = '.left__container'
	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'NotesContainer',
			listeners: ['click'],
			...options
		}),
		this.parentClass = '.left'
	}

	init() {
		super.init()

		renderNotes(
			this.notes,
			this.$componentRoot,
			this.activeNote,
			this.currentActiveNote,
			this.tags,
			this.filter
		)

		this.$on('notesPanel:addNote', () =>
		this.changeNoteWhenAdding())

		this.$on('noteInfo:changeTitle', title =>
		changeTitleOnNotesContainer(
			title, this.activeNote
			))

		this.$on('noteInfo:addTag', () =>
			changeNoteTags(this.notes, this.activeNote, this.tags)
		)

		this.$on('noteInfo:deleteTag', () =>
			changeNoteTags(this.notes, this.activeNote, this.tags)
		)

		this.$on('notesPanel:changeNotesStack', value =>
			this.changeNotesStack(value)
		)
	}

	toHTML() {
		const layout = notesContainerTemplate()
		$(this.parentClass).html(layout, 'add')
	}

	changeNoteWhenAdding() {
		this.notes.unshift(createNote())
		if (existsActiveNote(this.activeNote)) {
			this.currentActiveNote.numb = ++this.activeNote.numb
			this.notes[this.currentActiveNote.numb].activeDate = nowDate()
		}
		this.activeNote.numb = 0
		this.notes[this.activeNote.numb].activeDate = 'Сейчас'

		if ($('.left__panel-tags').$el.value) {
			$('.left__panel-tags').$el.value = ''
			this.changeNotesStack('')
			return
		}

		renderNotes(
			this.notes,
			this.$componentRoot,
			this.activeNote,
			this.currentActiveNote,
			this.tags,
			this.filter
		)
		storage('notes', this.notes)
		storage('activeNote', this.activeNote)
		storage('currentActiveNote', this.currentActiveNote)
	}

	changeNoteWhenChanging(target) {
		if (isActiveNote(target, this.activeNote.numb)) {
			return
		}
		this.currentActiveNote.numb = this.activeNote.numb
		this.notes[this.currentActiveNote.numb].activeDate = nowDate()
		this.activeNote.numb = +target.data('id')
		this.notes[this.activeNote.numb].activeDate = 'Сейчас'

		renderNotes(
			this.notes,
			this.$componentRoot,
			this.activeNote,
			this.currentActiveNote,
			this.tags,
			this.filter,
			'changeActiveNote'
		)
		storage('notes', this.notes)
		storage('activeNote', this.activeNote)
		storage('currentActiveNote', this.currentActiveNote)
	}

	deleteNote(id) {
		this.notes.splice(id, 1)

		if (!this.notes.length) {
			this.activeNote.numb = null
		} else {
			if (id < this.currentActiveNote.numb) {
				this.currentActiveNote.numb--
			} else if (id === this.currentActiveNote.numb) {
				this.currentActiveNote.numb = null
			}

			if (id < this.activeNote.numb) {
				this.activeNote.numb--
			} else if (id === this.activeNote.numb) {
				this.activeNote.numb = 0
				this.notes[this.activeNote.numb].activeDate = 'Сейчас'
				if (this.currentActiveNote.numb === 0) {
					this.currentActiveNote.numb = null
				}
			}
		}

		renderNotes(
			this.notes,
			this.$componentRoot,
			this.activeNote,
			this.currentActiveNote,
			this.tags,
			this.filter
		)
		storage('notes', this.notes)
		storage('activeNote', this.activeNote)
		storage('currentActiveNote', this.currentActiveNote)
	}

	changeNotesStack(value) {
		this.filter.value = value
		if (this.activeNote.numb || this.activeNote.numb === 0) {
			this.notes[this.activeNote.numb].activeDate = nowDate()
		}
		this.currentActiveNote.numb = null
		this.activeNote.numb = null

		renderNotes(
			this.notes,
			this.$componentRoot,
			this.activeNote,
			this.currentActiveNote,
			this.tags,
			this.filter,
			'changeNotesStack'
		)
		storage('notes', this.notes)
		storage('activeNote', this.activeNote)
		storage('currentActiveNote', this.currentActiveNote)
	}

	onClick(event) {
		const target = $(event.target)
		const el = target.data('el')
		switch (el) {
			case 'note':
			case 'noteContent':
			case 'noteTitle':
			case 'noteText':
			case 'noteInfo':
			case 'noteTags':
			case 'noteTag':
			case 'activeDate':
				this.changeNoteWhenChanging(target.closest('[data-id]'))
				this.$emit('notesContainer:changedActiveNote')
				break
			case 'noteDelete':
				this.deleteNote(+target.data('id'))
				this.$emit('notesContainer:deleteNote', +target.data('id'))
		}
	}
}
