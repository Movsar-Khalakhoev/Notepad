import {$} from '../../core/dom'

export function changeToolsState(state, $componentRoot) {
	resetToolsState($componentRoot)
	for (const active of state) {
		switch (active) {
			case 'b':
				activateTool('boldTool', $componentRoot)
				break
			case 'i':
				activateTool('italicTool', $componentRoot)
				break
			case 'u':
				activateTool('underlineTool', $componentRoot)
				break
		}
	}
}

function activateTool(toolAttr, $componentRoot) {
	$(`[data-el="${toolAttr}"]`, $componentRoot.$el).setData('toolActive')
}

export function resetToolsState($componentRoot) {
	$componentRoot
	.findAll('[data-toolactive]').forEach(el => $(el).delData('toolactive'))
}
