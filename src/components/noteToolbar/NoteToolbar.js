import {Component} from '../../core/Component'
import {noteToolbarTemplate} from './noteToolbar.template'
import {$} from '../../core/dom'

export class NoteToolbar extends Component {
	static className = '.right__toolbar'

	constructor($componentRoot) {
		super($componentRoot, {
			name: 'NoteToolbar',
			listeners: []
		}),
		this.parentClass = '.right'
	}

	toHTML() {
		const layout = noteToolbarTemplate()
		$(this.parentClass).html(layout, 'add')
	}
}
