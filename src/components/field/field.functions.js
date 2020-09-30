export function changeField($componentRoot, notes, activeNote) {
	if (!activeNote.numb && activeNote.numb !== 0) {
		$componentRoot.html('<h1>Нет активной заметки</h1>')
		return
	}

	$componentRoot.html(notes[activeNote.numb].inner)
}
