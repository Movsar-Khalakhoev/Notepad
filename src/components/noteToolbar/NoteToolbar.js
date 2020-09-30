import {Component} from '../../core/Component'
import {noteToolbarTemplate} from './noteToolbar.template'
import {$} from '../../core/dom'

export class NoteToolbar extends Component {
	static className = '.right__toolbar'

	constructor($componentRoot, options) {
		super($componentRoot, {
			name: 'NoteToolbar',
			listeners: [],
			...options
		}),
		this.parentClass = '.right'
	}

	toHTML() {
		const layout = noteToolbarTemplate()
		$(this.parentClass).html(layout, 'add')
	}
}
