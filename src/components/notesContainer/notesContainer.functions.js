import {$} from '../../core/dom'

export function existsActiveNote(activeNote) {
	return activeNote.numb || activeNote.numb === 0
}

function existsNote(note) {
	return note.numb || note.numb === 0
}

export function nowDate() {
	return new Date().toLocaleString().slice(0, -3)
}

export function isActiveNote(target, activeNoteNumb) {
	return +target.data('id') == activeNoteNumb
}

export function createNote() {
	const date = new Date()
	const id = date.getTime()
	return {
		'id': id,
		'title': 'Заметка-',
		'createDate': date.toLocaleString(),
		'activeDate': 'Сейчас',
		'inner': `${new Date().getTime()}`,
		'noteTags': []
	}
}

function noteLayout(note, index, activeNote, tags = '') {
	return `
		<div
			class="left__note note"
			data-id="${index}"
			${activeNote}
			data-el="note"
		>
			<div class="note__icon">
				<span
					class="note__delete"
					data-id="${index}"
					data-el="noteDelete"
				></span>
			</div>
			<div class="note__content" data-el="noteContent">
				<p class="note__title" data-el="noteTitle">${note.title}</p>
				<p class="note__text" data-el="noteText">
					Lorem ipsum dolor sit amet.
				</p>
				<div class="note__info" data-el="noteInfo">
					<div class="note__tags" data-el="noteTags">
						${tags}
					</div>
					<p class="note__datetime" data-el="activeDate">${note.activeDate}</p>
				</div>
			</div>
		</div>
	`
}

function getTagsLayout(note, tags) {
	let tagsLayout = ' '
	tags.forEach(tag => {
		if (note.noteTags.includes(tag.name)) {
			tagsLayout += tag.layout
		}
	})

	return tagsLayout
}

export function renderNotes(
		notes,
		$componentRoot,
		activeNote,
		currentActiveNote,
		tags,
		filter,
		mode
	) {
	let notesLayout = ' '
	let activeNoteStyle = ''
	let firstNote = 1
	const filterVal = filter.value || null

	notes.forEach((note, index) => {
		const tagsLayout = getTagsLayout(note, tags)

		if (filterVal && !note.noteTags.includes(filterVal)) {
			return
		}
		if (filterVal && firstNote && mode != 'changeActiveNote') {
			activeNote.numb = index
			notes[index].activeDate = 'Сейчас'
			firstNote--
		}

		if (!filterVal && mode === 'changeNotesStack') {
			activeNote.numb = 0
			notes[activeNote.numb].activeDate = 'Сейчас'
		}

		activeNoteStyle = activeNote.numb === index ?
		'data-active' :
		''
		notesLayout += noteLayout(note, index, activeNoteStyle, tagsLayout)
	})

	$componentRoot.html(notesLayout)


	existsNote(activeNote) ?
	activeNote.target = $(`[data-id="${activeNote.numb}"]`, $componentRoot.$el) :
	activeNote.target = null

	existsNote(currentActiveNote) ?
	currentActiveNote.target =
	$(`[data-id="${currentActiveNote.numb}"]`, $componentRoot.$el) :
	currentActiveNote.target = null
}

export function changeTitleOnNotesContainer(title, activeNote) {
	const activeTitle = $(`[data-el="noteTitle"]`, activeNote.target.$el)
	activeTitle.textContent(title)
}

export function changeNoteTags(notes, activeNote, tags) {
	const tagsContainer = $(`[data-el="noteTags"]`, activeNote.target.$el)
	const tagsLayout = getTagsLayout(notes[activeNote.numb], tags)

	tagsContainer.html(tagsLayout)
}
