import {Component} from '../../core/Component'
import {fieldTemplate} from './field.template'
import {$} from '../../core/dom'
import {
	changeField,
	cleanInner,
	getReplaceString,
	selectionInfo,
	updateExtractedIntervals
} from './field.functions'
import {storage} from '../../core/storage'

export class Field extends Component {
	static className = '.right__field'

	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'Field',
			listeners: ['input', 'mouseup'],
			...options
		})
		this.parentClass = '.right'
		this.timer = null
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

		this.$on('noteToolbar:clickOnTool', (tool, isActive) =>
		this.changeFieldInner(tool, isActive))
	}

	toHTML() {
		const layout = fieldTemplate()
		$(this.parentClass).html(layout, 'add')
	}

	onInput(event) {
		this.notes[this.activeNote.numb].inner = event.target.innerHTML
		storage('notes', this.notes)

		clearInterval(this.timer)
		this.timer = setTimeout(() => updateExtractedIntervals(
			this.$componentRoot.html(),
			this.notes[this.activeNote.numb].exstractedIntervals,
			this.timer
			), 400)
	}

	onMouseup(event) {
		this.selection = selectionInfo(
			this.$componentRoot,
			this.notes[this.activeNote.numb].exstractedIntervals
		)

		this.$emit('field:selectedText', this.selection.state)
	}

	changeFieldInner(tool, isActive) {
		if (!this.selection) return
		let active
		switch (tool) {
			case 'boldTool':
				active = isActive ? '</b>' : '<b>'
				break
			case 'italicTool':
				active = isActive ? '</i>' : '<i>'
				break
			case 'underlineTool':
				active = isActive ? '</u>' : '<u>'
				break
		}

		this.$componentRoot.html(
			getReplaceString(active, this.selection)
		)

		cleanInner(this.$componentRoot)
		updateExtractedIntervals(
			this.$componentRoot.html(),
			this.notes[this.activeNote.numb].exstractedIntervals,
			)
		this.selection = null
		this.$componentRoot.$el.focus()
		const range = document.createRange()
		range.selectNodeContents(this.$componentRoot.$el)
		range.collapse(false)
		const sel = window.getSelection()
		sel.removeAllRanges()
		sel.addRange(range)
	}
}
