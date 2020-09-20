export function functionName(eventName) {
	return `on${eventName[0].toUpperCase()}${eventName.slice(1)}`
}
