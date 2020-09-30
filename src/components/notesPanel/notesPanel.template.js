export function notesPanelTemplate() {
	return `
		<div class="left__panel">
			<div class="left__panel-add" data-el="addNote">
				<span class="material-icons" data-el="addNote">add</span>
			</div>
			<select
				name="tags" id="tags"
				class="left__panel-tags"
				data-el="notesPanelTags"
			>
				<option value="1" class="left__panel-tag">Важность</option>
				<option value="2" class="left__panel-tag">Дата</option>
				<option value="3" class="left__panel-tag">Дедлайн</option>
			</select>
		</div>
	`
}
