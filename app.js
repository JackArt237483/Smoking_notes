let notes = []

const noteText = document.getElementById('note_text')
const addNoteBtn = document.getElementById('add_note_btn')
const notesList = document.getElementById('notes_list')

let editingNote = -1 //индекс редактируемой заметки

function saveNotesToLocalStorage() {
  localStorage.setItem('notes',JSON.stringify(notes))
}

function loadNotesToLocalStorage() {
  const saveNotes = localStorage.getItem('notes')

  if(saveNotes){
    notes = JSON.parse(saveNotes)
  }
}

function renderNote() {
  notesList.innerHTML = ""

  notes.forEach((note,index)=> {
    const newItem = document.createElement('div')
    newItem.classList.add('note-item')

    const textItem = document.createElement('p')
    textItem.textContent = note
    textItem.classList.add('note-text')

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Удалить'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.onclick = () => deleteNote(index)

    const updateBtn = document.createElement('button')
    updateBtn.textContent = 'Изменить'
    updateBtn.classList.add('edit-btn')
    updateBtn.onclick = () => editNote(index)

    notesList.appendChild(newItem)
    newItem.appendChild(textItem)
    newItem.appendChild(deleteBtn)
    newItem.appendChild(updateBtn)
  })

  if(editingNote !== -1) {
      addNoteBtn.textContent = 'Сохранить мен'
  } else {
      addNoteBtn.textContent = 'Добавить заметку'
  }
}

function addNote() {
  const text = noteText.value.trim()
  if(text === ""){
    alert('Что не то мужик')
    return
  }
  if(editingNote !== -1){
      notes[editingNote] = text
      editingNote = -1
  } else {
    notes.push(text)
  }
  noteText.value = ""
  renderNote()
  saveNotesToLocalStorage()
}

function deleteNote(index) {
  notes.splice(index,1)
  renderNote()
  saveNotesToLocalStorage()
}

function editNote(index){
  editingNote = index
  noteText.value = notes[index]
  noteText.focus()
  renderNote()
}

addNoteBtn.addEventListener('click',addNote)

loadNotesToLocalStorage()
renderNote()