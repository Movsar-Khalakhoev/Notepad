import {$} from '../../core/dom'

export function addTagList($componentRoot, tags) {
	const tagsContainer = $('[data-el="notesPanelTags"]', $componentRoot.$el)
	let listLayout = ' '

	listLayout += `<option class="left__panel-tag"></option>`

	tags.forEach(tag => {
		listLayout += `<option
		value="${tag.name}"
		class="left__panel-tag"
		>${tag.title}</option>`
	})

	tagsContainer.html(listLayout)
}
