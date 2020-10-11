class Dom {
	constructor(selector, field = document) {
		this.$el = typeof selector === 'string' ?
		field.querySelector(selector) :
		selector
	}

	html(node, mode = '') {
		if (node === ' ' && !mode) {
			this.$el.innerHTML = ''
		} else if (node && !mode) {
			this.$el.innerHTML = node
			return this
		} else if (node && mode === 'add') {
			this.$el.innerHTML += node
			return this
		} else {
			return this.$el.innerHTML
		}
	}

	value(text) {
		this.$el.value = text
	}

	on(eventName, func) {
		this.$el.addEventListener(eventName, func)
	}

	off(eventName, func) {
		this.$el.removeEventListener(eventName, func)
	}

	data(type = '') {
		if (!this.$el.dataset[type]) {
			return false
		} else {
			return this.$el.dataset[type]
		}
	}

	setData(type, value = '') {
		if (!type) {
			return
		}

		this.$el.setAttribute(`data-${type}`, value)
	}

	delData(type) {
		if (!type) {
			return
		}

		this.$el.removeAttribute(`data-${type}`)
	}

	closest(selector) {
		return $(this.$el.closest(selector))
	}

	css(styles) {
		if (!styles) {
			this.$el.style = ''
			return this
		}
		Object.keys(styles).forEach(style => {
			this.$el.style[style] = styles[style]
		})
	}

	textContent(text) {
		this.$el.textContent = text
		return this
	}

	find(selector) {
		return this.$el.querySelector(selector)
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}
}

export function $(selector, field) {
	return new Dom(selector, field)
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}

	return $(el)
}
