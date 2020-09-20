import {Notepad} from './components/notepad/Notepad'
import {NotesPanel} from './components/notesPanel/NotesPanel'
import {NotesContainer} from './components/notesContainer/NotesContainer'
import {NoteInfo} from './components/noteInfo/NoteInfo'
import {NoteToolbar} from './components/noteToolbar/NoteToolbar'
import {Field} from './components/field/Field'
import './sass/style.sass'

const notepad = new Notepad('#app', {
	components: [NotesPanel, NotesContainer, NoteInfo, NoteToolbar, Field]
})

notepad.render()
