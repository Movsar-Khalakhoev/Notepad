import {Component} from '../../core/Component'
import {$} from '../../core/dom'
import {notesContainerTemplate} from './notesContainer.template'

export class NotesContainer extends Component {
	static className = '.left__container'
	constructor($componentRoot) {
		super($componentRoot, {
			name: 'NotesContainer',
			listeners: []
		}),
		this.parentClass = '.left'
	}

	toHTML() {
		const layout = notesContainerTemplate()
		$(this.parentClass).html(layout, 'add')
	}
}
