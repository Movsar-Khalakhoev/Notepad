export function noteToolbarTemplate() {
	return `
	<div class="right__toolbar">
		<div class="right__toolbar-tools tools">
			<div class="tool tools__bold" data-el="boldTool">
				<span class="material-icons" data-el="boldTool">format_bold</span>
			</div>
			<div class="tool tools__italic" data-el="italicTool">
				<span class="material-icons" data-el="italicTool">format_italic</span>
			</div>
			<div class="tool tool_underline" data-el="underlineTool">
				<span class="material-icons"
				 data-el="underlineTool">format_underlined</span>
			</div>
		</div>
	</div>
	`
}
