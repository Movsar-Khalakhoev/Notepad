import {Component} from '../../core/Component'
import {noteInfoTemplate} from './noteInfo.template'
import {$} from '../../core/dom'

export class NoteInfo extends Component {
	static className = '.right__info'
	constructor($componentRoot) {
		super($componentRoot, {
			name: 'NoteInfo',
			listeners: []
		})
		this.parentClass = '.right'
	}

	toHTML() {
		const layout = noteInfoTemplate()
		$(this.parentClass).html(layout, 'add')
	}
}
