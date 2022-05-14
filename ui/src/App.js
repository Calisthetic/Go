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


  return (
    <div className="App">
      <header>
        <div className="Container"></div>
      </header>
      <div className="Main">
        <div className="Container">
          <label>Заголовок</label>
          <input ref={inputTitle} type="text"/>
          <label>Описание</label>
          <input ref={inputInfo} type="text"/>
          <button 
            onClick={() => addNote()}>
              Добавить
          </button>

          <div className="Notes">
            {!!notes && notes.map((note, index) => (
              <div className="Note_block" key={index}>
                <div>{note.title}</div>
                <div>{note.info}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
