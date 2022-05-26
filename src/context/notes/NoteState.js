import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    //API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4YmM1ZjEzZDU3ZDI4MjlhM2Y5YjI1In0sImlhdCI6MTY1MzM5ODA3N30.PbmEpF7GetKKvDoWU7lUQg8iGNl0CV2tEQYUL9Gdsw8'
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

  }

  const addNote = async (title, description, tag) => {

    //API Call 
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4YmM1ZjEzZDU3ZDI4MjlhM2Y5YjI1In0sImlhdCI6MTY1MzM5ODA3N30.PbmEpF7GetKKvDoWU7lUQg8iGNl0CV2tEQYUL9Gdsw8'
      },
      body: JSON.stringify({ title, description, tag })
    });

    //Adding a new Note
    console.log('Adding a note');
    const note = {
      "_id": "628f0fbeeea33a0b61d6ff47",
      "user": "628bc5f13d57d2829a3f9b25",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-05-26T05:27:26.268Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    //API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4YmM1ZjEzZDU3ZDI4MjlhM2Y5YjI1In0sImlhdCI6MTY1MzM5ODA3N30.PbmEpF7GetKKvDoWU7lUQg8iGNl0CV2tEQYUL9Gdsw8'
      },
    });
    const json = await response.json();
    console.log(json);
    
    console.log('Deleting a note with id : ' + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4YmM1ZjEzZDU3ZDI4MjlhM2Y5YjI1In0sImlhdCI6MTY1MzM5ODA3N30.PbmEpF7GetKKvDoWU7lUQg8iGNl0CV2tEQYUL9Gdsw8'

      },
      body: JSON.stringify({ title, description, tag })
    });

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes.title = title;
        notes.description = description;
        notes.tag = tag;
        break;
      }
    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;