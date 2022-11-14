import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const { note, updateNote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = () => {
        deleteNote(note._id);
    }

    return (
        <>
            <div className="col-md-4">
                <div className="card my-3">
                    <h5 className="card-header align-items-center">{note.tag}</h5>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() =>{updateNote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem