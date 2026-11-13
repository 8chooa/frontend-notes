import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglabel from './components/Togglabel';
import noteService from  './services/notes';
import loginService from './services/login';
import './index.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef(); // por defecto undefined

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedNoteappUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleShowAll = () => {
      setShowAll(!showAll)
  };

  const toggleImportanceOf = (id) => {
      const note = notes.find(n => n.id === id);
      const changedNote = {...note, important: !note.important};

      noteService.update(id, changedNote)
      .then(noteUpdated => {
          setNotes(notes.map(note => note.id === id ? noteUpdated : note));
      })
      .catch(() => {
          setErrorMessage(`Note ${note.content} was already removed from server`);
          setTimeout(() => {
              setErrorMessage(null);
          }, 5000);
          setNotes(notes.filter(note => note.id !== id));
      });

  };

  const handleLogin = (loginData) => {
    return loginService
      .login(loginData)
      .then((userData) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(userData));
        noteService.setToken(userData.token);
        setUser(userData);
      })
      .catch(err => {
        let mess = err.response.status === 401 ? 'wrong credentials' : 'internal error';
        setErrorMessage(mess);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000)
        throw err;
      })
  }

  const loginForm = () => (
    <Togglabel buttonLabel="login">
      <LoginForm sendData={handleLogin}/>
    </Togglabel>
  )

  const noteForm = () => (
    <Togglabel buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglabel>
  )

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
    noteFormRef.current.toggleVisibility();
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return(
    <div className='contenedor'>
      <h1>Notes</h1>
      {errorMessage && (
        <Notification message={errorMessage}/>
      )}
      
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <div className='container-important__button'>
        <button className='important__button' onClick={handleShowAll}>{showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      
      <Footer />
    </div>
  );
};

export default App;