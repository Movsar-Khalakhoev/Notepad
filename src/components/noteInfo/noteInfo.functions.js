import {$} from '../../core/dom'

export function changeInfoInNoteInfo($componentRoot, notes, activeNote, tags) {
	const titleElement = $('[data-el="noteInfoTitle"]', $componentRoot)
	const tagsContainer = $('[data-el="noteInfoTags"]', $componentRoot)
	const createDateElement = $('[data-el="noteInfoCreateDate"]', $componentRoot)
	let tagsLayout = ' '

	if (activeNote.numb || activeNote.numb === 0) {
		titleElement.textContent(notes[activeNote.numb].title)
		tags.forEach(tag => {
			if (notes[activeNote.numb].noteTags.includes(tag.name)) {
				tagsLayout += tag.infoLayout
			}
		})
		tagsContainer.html(tagsLayout)

		createDateElement.textContent(
			notes[activeNote.numb].createDate.toLocaleString().slice(1, -3)
		)
	} else {
		titleElement.textContent('')
		createDateElement.textContent('')
	}
}

export function addTagsList($componentRoot, notes, activeNote, tags) {
	if (!activeNote.numb && activeNote.numb !== 0) {
		return
	}
	const addContainer = $('[data-el="noteInfoAdd"]', $componentRoot)
	const listLayout = $.create('ul', 'right__info-add-list')
	listLayout.setData('el', 'noteInfoList')
	tags.forEach(tag => {
		if (!notes[activeNote.numb].noteTags.includes(tag.name)) {
			listLayout.html(`
			<li
				class="right__info-add-el"
				data-el="noteInfoTag"
				data-value="${tag.name}"
			>${tag.title}</li>
			`, 'add')
		}
	})

	if ($('[data-el="noteInfoList"]', $componentRoot).$el) {
		addContainer.$el.
		removeChild($('[data-el="noteInfoList"]', $componentRoot).$el)
	}

	if (listLayout.$el.innerHTML) {
		addContainer.html(listLayout.$el.outerHTML, 'add')
	}
}
