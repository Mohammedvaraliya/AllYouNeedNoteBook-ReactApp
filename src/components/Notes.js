import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {

    let nevigate = useNavigate();

    const { showAlert } = props;

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {

        if (localStorage.getItem('token')){
            getNotes();
        }
        else{
            nevigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert(`Note with title ${note.etitle} Updated successfully!`, "success");
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className='row g-3 '>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>


                                <div className="mb-3 col-md-6">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea type="text" rows="5" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required ></textarea>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && <img src="https://cdn.dribbble.com/users/2666881/screenshots/11346959/media/eea44d0bd2ba581f2087172a3891caba.png" alt="Girl in a jacket" width="650" height="450"></img>}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes