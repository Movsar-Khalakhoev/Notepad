export function noteInfoTemplate() {
	return `
		<div class="right__info">
			<p class="right__info-title"
				data-el="noteInfoTitle"
				contenteditable>Note</p>
			<div class="right__info-content">
				<div class="right__info-tags" data-el="noteInfoTags">
				</div>
				<div class="right__info-add" data-el="noteInfoAdd">
					<p class="right__info-add-button">Добавить тег</p>
				</div>
				<p
					class="right__info-date"
					title="Дата создания"
					data-el="noteInfoCreateDate"
				>13.09.2020 20:30</p>
			</div>
		</div>
	`
}
