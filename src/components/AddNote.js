import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context; // Destructuring and bringing the comtext's addNote value here and storing in this addNote

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        //setNote({title: "", description: "", tag: ""})
        //props.showAlert("Added successfully","success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

  return (
    <div>
    <form className="my-3">
      <h2>Add a Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" onChange={onChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} required />
      </div>
    </form>
    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Me</button>
  </div>
  )
}

export default AddNote