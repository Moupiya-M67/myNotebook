import React from 'react'
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context; // Destructuring and bringing the comtext's notes and setNotes' value here and storing in these notes and setNotes

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            {/* Add note component - Contains Title, Description and Tag client side */}
            <AddNote />

            <div className="row my-3">
                <h2>Yours Notes</h2>

                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes