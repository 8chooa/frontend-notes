const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
      <li className="note" data-testid="note-item">
        Your awesome note: {note.content}
        <button onClick={toggleImportance} className="make__important__button important__button">{label}</button>
      </li>
  )
}

export default Note