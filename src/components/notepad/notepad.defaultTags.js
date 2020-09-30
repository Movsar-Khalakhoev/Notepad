export const defaultTags = [
	{
		title: 'Важно',
		name: 'importance',
		layout: `
		<div
			class="tag"
			style="background-color: rgb(45,64,89)"
			data-value="importance"
			data-el="noteTag"
		></div>`,
		infoLayout: `
		<div
			class="tag"
			style="background-color: rgb(45,64,89)"
			data-value="importance"
		>
			<span
				class="tag-delete"
				data-value="importance"
				data-el="tagDelete"
			></span>
		</div>`
	},
	{
		title: 'Работа',
		name: 'job',
		layout: `
		<div
			class="tag"
			style="background-color: rgb(234,84,85)"
			data-value="job"
			data-el="noteTag"
		></div>`,
		infoLayout: `
		<div
			class="tag"
			style="background-color: rgb(234,84,85)"
			data-value="job"
		>
			<span
				class="tag-delete"
				data-value="job"
				data-el="tagDelete"
			></span>
		</div>`
	},
	{
		title: 'Учеба',
		name: 'study',
		layout: `
		<div
			class="tag"
			style="background-color: rgb(240,123,63)"
			data-value="study"
			data-el="noteTag"
		></div>`,
		infoLayout: `
		<div
			class="tag"
			style="background-color: rgb(240,123,63)"
			data-value="study"
		>
			<span
				class="tag-delete"
				data-value="study"
				data-el="tagDelete"
				></span>
		</div>`
	},
	{
		title: 'Хобби',
		name: 'hobby',
		layout: `
		<div
			class="tag"
			style="background-color: rgb(255,212,96)"
			data-value="hobby"
			data-el="noteTag"
		></div>`,
		infoLayout: `
		<div
			class="tag"
			style="background-color: rgb(255,212,96)"
			data-value="hobby"
		>
			<span
				class="tag-delete"
				data-value="hobby"
				data-el="tagDelete"
			></span>
		</div>`
	}
]
