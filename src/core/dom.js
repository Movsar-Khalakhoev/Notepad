class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string' ?
		document.querySelector(selector) :
		selector
	}

	html(node, mode = '') {
		if (node && !mode) {
			this.$el.innerHTML = node
			return this
		} else if (node && mode === 'add') {
			this.$el.innerHTML += node
			return this
		} else {
			return this.$el.innerHTML.trim()
		}
	}

	on(eventName, func) {
		this.$el.addEventListener(eventName, func)
	}

	off(eventName, func) {
		this.$el.removeEventListener(eventName, func)
	}
}

export function $(selector) {
	return new Dom(selector)
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}

	return $(el)
}
