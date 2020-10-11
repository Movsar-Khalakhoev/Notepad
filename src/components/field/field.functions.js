export function changeField($componentRoot, notes, activeNote) {
	if (!activeNote.numb && activeNote.numb !== 0) {
		$componentRoot.html('<h1>Нет активной заметки</h1>')
		return
	}

	$componentRoot.html(notes[activeNote.numb].inner)
}

function fixIERangeObject(range, win) {
  win = win || window;

  if (!range) return null;
  if (!range.startContainer && win.document.selection) {
    const _findTextNode = function(parentElement, text) {
      let container = null
      let offset = -1;
      for (let node = parentElement.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) {
          const find = node.nodeValue;
          const pos = text.indexOf(find);
          if (pos == 0 && text != find) {
            text = text.substring(find.length);
          } else {
            container = node;
            offset = text.length - 1
            break;
          }
        }
      }
      return {
        node: container,
        offset: offset
      };
    }

    const rangeCopy1 = range.duplicate()
    const rangeCopy2 = range.duplicate();
    const rangeObj1 = range.duplicate()
    const rangeObj2 = range.duplicate();

    rangeCopy1.collapse(true);
    rangeCopy1.moveEnd('character', 1);
    rangeCopy2.collapse(false);
    rangeCopy2.moveStart('character', -1);

    const parentElement1 = rangeCopy1.parentElement()
    const parentElement2 = rangeCopy2.parentElement();

		if (parentElement1 instanceof HTMLInputElement ||
			parentElement2 instanceof HTMLInputElement) {
      return null;
    }
    rangeObj1.moveToElementText(parentElement1);
    rangeObj1.setEndPoint('EndToEnd', rangeCopy1);
    rangeObj2.moveToElementText(parentElement2);
    rangeObj2.setEndPoint('EndToEnd', rangeCopy2);

    const text1 = rangeObj1.text;
    const text2 = rangeObj2.text;

    const nodeInfo1 = _findTextNode(parentElement1, text1);
    const nodeInfo2 = _findTextNode(parentElement2, text2);

    range.startContainer = nodeInfo1.node;
    range.startOffset = nodeInfo1.offset;
    range.endContainer = nodeInfo2.node;
    range.endOffset = nodeInfo2.offset + 1;
  }
  return range;
}

function getRangeObject(win) {
  win = win || window;
  if (win.getSelection) {
    try {
      return win.getSelection().getRangeAt(0);
    } catch (e) {
			return
		}
  } else if (win.document.selection) { // IE8
    const range = win.document.selection.createRange();
    return fixIERangeObject(range, win);
  }
  return null;
}

export function selectionInfo($componentRoot, exstractedIntervals) {
	const range = getRangeObject()
	const selectionText = range.toString()
	const preCaretRange = range.cloneRange()
	preCaretRange.selectNodeContents($componentRoot.$el)
	preCaretRange.setEnd(range.startContainer, range.startOffset)
	const caretOffset = preCaretRange.toString().length
	const inner = $componentRoot.html()
	let innerOffset = caretOffset
	let isTag
	let tagCounter = 0
	let symbolCounter = 0
	for (const symbol of inner) {
		if (symbol === '<') {
			isTag = true
		}
		if (isTag) {
			tagCounter++
		} else {
			if (symbolCounter === innerOffset) {
				innerOffset += tagCounter
				break
			}
			symbolCounter++
		}
		if (symbol === '>') {
			isTag = false
		}
	}

	let text = ''
	let count = 0
	let count2 = 0
	isTag = null
	while (count < selectionText.length) {
		if (inner.slice(innerOffset)[count2] === '<') isTag = true
		if (selectionText[count] === inner.slice(innerOffset)[count2] && !isTag) {
			count++
		}
		text += inner.slice(innerOffset)[count2]
		count2++
		if (inner.slice(innerOffset)[count2] === '>') isTag = false
	}

	const state = getSelectionState(text, innerOffset, exstractedIntervals)
	return {
		caretOffset,
		innerOffset,
		inner,
		selectionText,
		range,
		text,
		state
	}
}

export function getSelectionState(text, innerOffset, exstractedIntervals) {
	const segmentsIntervals = []
	const intervalIndexes = []
	let isTag
	let flag
	// debugger
	for (const index in text) {
		if (text[index]) {
			const symbol = text[index]
			if (symbol === '<') isTag = true

			if (!isTag && symbol.trim()) {
				intervalIndexes.push(+index+innerOffset)
				flag = true
			} else if (flag) {
				segmentsIntervals
				.push([Math.min(...intervalIndexes), Math.max(...intervalIndexes)])
				flag = false
				intervalIndexes.length = 0
			}

			if (symbol === '>') isTag = false
		}
	}
	if (intervalIndexes.length) {
		segmentsIntervals
		.push([Math.min(...intervalIndexes), Math.max(...intervalIndexes)])
		intervalIndexes.length = 0
	}

	const state = []

	Object.keys(exstractedIntervals).forEach(key => {
		const tag = exstractedIntervals[key]
		let isTag = true

		for (const interval of segmentsIntervals) {
			const [start, end] = interval
			let isEntry = false

			for (const tagInterval of tag) {
				const [intervalStart, intervalEnd] = tagInterval
				if (intervalStart <= start && end <= intervalEnd) {
					isEntry = true
					break
				}
			}

			if (!isEntry) {
				isTag = false
				break
			}
		}

		if (isTag && text) {
			state.push(key)
		}
	})

	return state
}

export function getReplaceString(wrapper, selection) {
	let isTag = false
	let tag = ''
	const tags = []
	const openTags = []
	const closeTags = []

	for (const symbol of selection.text) {
		if (symbol === '<') isTag = true

		if (isTag) {
			tag += symbol
		}

		if (symbol === '>') {
			isTag = false
			if (tag === isCoupleTag(tags[tags.length - 1]) && tag[1] === '/') {
				tags.pop()
				openTags.pop()
			} else {
				tag[1] === '/' ? closeTags.push(tag) : openTags.push(tag)
				tags.push(tag)
			}
			tag = ''
		}
	}

	let outputString = ''
	if (wrapper[1] !== '/') {
		// eslint-disable-next-line no-useless-escape
		const closeTagReg = new RegExp(`<\/${tagName(wrapper)}>`, 'g')
		const openTagReg = new RegExp(`<${tagName(wrapper)}>`, 'g')
		outputString += closeTags.join('')
		outputString += wrapper
		outputString += closeTags
		.slice(0).reverse().join('').replace(/\//g, '').replace(openTagReg, '')
		outputString +=
		selection.text.replace(closeTagReg, '').replace(openTagReg, '')
		outputString += openTags.slice(0).reverse().join('')
		.replace(/</g, '</').replace(closeTagReg, '')
		outputString += isCoupleTag(wrapper)
		outputString += openTags.join('')
	} else {
		// eslint-disable-next-line no-useless-escape
		const closeTagReg = new RegExp(`<\/${tagName(wrapper)}>`, 'g')
		const openTagReg = new RegExp(`<${tagName(wrapper)}>`, 'g')
		outputString += closeTags.join('').replace(closeTagReg, '')
		outputString += wrapper
		outputString += closeTags
		.slice(0).reverse().join('').replace(closeTagReg, '').replace(/\//g, '')
		outputString += selection
		.text.replace(openTagReg, '').replace(closeTagReg, '')
		outputString += openTags
		.slice(0).reverse().join('').replace(openTagReg, '').replace(/</g, '</')
		outputString += isCoupleTag(wrapper)
		outputString += openTags.join('').replace(openTagReg, '')
	}

	const newInner =
	selection.inner.slice(0, selection.innerOffset) +
	outputString +
	selection.inner.slice(selection.innerOffset+selection.text.length)

	const elem = document.createElement('p')
	elem.innerHTML = newInner
	return elem.innerHTML
}

function isCoupleTag(tag) {
	if (!tag) return

	if (tag[1] === '/') return `<${tag.slice(2)}`
	return `</${tag.slice(1)}`
}

function tagName(tag) {
	if (tag[1] === '/') return tag.slice(2, -1)
	return tag.slice(1, -1)
}

export function updateExtractedIntervals(inner, exstractedIntervals) {
	let isTag
	let tag = ''
	const lastIntervals = []
	const intervals = []
	const tags = []
	for (const property of Object.keys(exstractedIntervals)) {
		delete exstractedIntervals[property]
	}
	for (const index in inner) {
		if (inner[index] || inner[index] == 0) {
			const symbol = inner[index]

			if (symbol === '<') {
				isTag = true
				const interval = []
				interval.push(+index)
				intervals.push(interval)
			}

			if (isTag) {
				tag += symbol
				if (symbol === '/') intervals.pop()
			}

			if (symbol === '>') {
				isTag = false
				if (tags[tags.length - 1] === isCoupleTag(tag)) {
					tags.pop()
					intervals[intervals.length - 1].push(+index)
					intervals[intervals.length - 1].push(tagName(tag))
					exstractedIntervals[tagName(tag)] =
					exstractedIntervals[tagName(tag)] || []
					exstractedIntervals[tagName(tag)]
					.push(intervals[intervals.length - 1])
					lastIntervals.push(intervals[intervals.length - 1])
					intervals.pop()
				} else {
					tags.push(tag)
				}
				tag = ''
			}
		}
	}
}

export function cleanInner(root) {
	let inner = root.html()
	while (inner.search(/<([a-z]*)>\s*<\/\1>/) !== -1) {
		inner = inner.replace(/<([a-z]*)>(\s*)<\/\1>/g, '$2')
	}

	while (inner.search(/<\/([a-z]*)><\1>/) !== -1) {
		inner = inner.replace(/<\/([a-z]*)><\1>/g, '')
	}

	root.html(inner)
}


window.funct = function(wrapper, closeTags) {
	// eslint-disable-next-line no-useless-escape
	const reg = new RegExp(`<\/${tagName(wrapper)}>`)
	return closeTags.join('').replace(reg, '')
}

window.replace = function(str) {
	return str.replace(/&nbsp;/g, ' ')
}
