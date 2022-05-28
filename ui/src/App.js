import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputInfo = useRef(null);
  const inputTitle = useRef(null);
  
  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }
    ).then(response => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [isUpdate]);

  const addNote = () => {
    axios.post(
      'http://localhost:9090/api/note/add', 
      {
        title: inputTitle.current.value,
        info: inputInfo.current.value
      }, 
      {
        withCredentials: false
      }).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const editNote = (id) => {
    axios.post(
      'http://localhost:9090/api/note/edit' + id, 
      {
        title: inputTitle.current.value,
        info: inputInfo.current.value
      }, 
      {
        withCredentials: false
      }).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const deleteNote = (id) => {
    axios.delete(
      'http://localhost:9090/api/note/' + id , 
      {
        withCredentials: false
      }).then(() => {
        setIsUpdate(!isUpdate);
      });
  }


  return (
    <div className="App">
      <header>
        <div className="Container"></div>
      </header>
      <div className="Main">
        <div className="Container">
          <div className="Add">
            <div>
              <label>Заголовок</label>
              <input ref={inputTitle} type="text"/>
            </div>
            <div>
              <label>Описание</label>
              <input ref={inputInfo} type="text"/>
            </div>
            <button 
              onClick={() => addNote()}>
                Добавить
            </button>
          </div>

          <div className="Notes">
            {!!notes && notes.map((note, index) => (
              <div className="Note_block" key={index}>
                <div className="Block_text">
                  <div className="Block_title">{note.title}</div>
                  <div className="Block_info">{note.info}</div>
                </div>
                <div className="Block_buttons">
                  <button className="Edit_button"
                    onClick={() => editNote(note.id)}
                  >Edit</button>
                  <button className="Delete_button"
                    onClick={() => deleteNote(note.id)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
