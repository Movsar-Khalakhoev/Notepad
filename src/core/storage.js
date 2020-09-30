export function storage(name, value) {
	if (!value) {
		return JSON.parse(localStorage.getItem(name))
	}

	return localStorage.setItem(name, JSON.stringify(value))
}
