import {Component} from '../../core/Component'
import {fieldTemplate} from './field.template'
import {$} from '../../core/dom'

export class Field extends Component {
	static className = '.right__field'

	constructor($componentRoot) {
		super($componentRoot, {
			name: 'Field',
			listeners: []
		})
		this.parentClass = '.right'
	}

	toHTML() {
		const layout = fieldTemplate()
		$(this.parentClass).html(layout, 'add')
	}
}
