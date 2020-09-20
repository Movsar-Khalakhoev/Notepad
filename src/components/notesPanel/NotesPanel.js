import {Component} from '../../core/Component'
import {$} from '../../core/dom'
import {notesPanelTemplate} from './notesPanel.template'

export class NotesPanel extends Component {
	static className = '.left__panel'
	constructor($componentRoot) {
		super($componentRoot, {
			name: 'NotesPanel',
			listeners: []
		}),
		this.parentClass = '.left'
	}

	toHTML() {
		const layout = notesPanelTemplate()
		$(this.parentClass).html(layout)
	}
}
