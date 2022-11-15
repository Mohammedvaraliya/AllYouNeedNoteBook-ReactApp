import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // Get all Note
  const getNotes = async () => {
    console.log("Get all note")
    // API cal
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWM3MDk4ZWUwNTZkODc0ZWQ4OTM2In0sImlhdCI6MTY2Njk3NDQ5MH0.WhuO2MoReJoBQW9XiGpMUPjKxfaSPd6JB_ZGO9f_22w'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    

  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note")
    // TODO : API call
    // API cal
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWM3MDk4ZWUwNTZkODc0ZWQ4OTM2In0sImlhdCI6MTY2Njk3NDQ5MH0.WhuO2MoReJoBQW9XiGpMUPjKxfaSPd6JB_ZGO9f_22w'
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log(json);

    const note = {
      "_id": "636a48b3793abzzzx51763ff61e07",
      "user": "635ac7098ee056d874ed8936",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-11-08T12:16:51.712Z",
      "__v": 0
    };
    setNotes(notes.concat(note));

  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWM3MDk4ZWUwNTZkODc0ZWQ4OTM2In0sImlhdCI6MTY2Njk3NDQ5MH0.WhuO2MoReJoBQW9XiGpMUPjKxfaSPd6JB_ZGO9f_22w'
      }
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    });
    setNotes(newNotes);

  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    console.log("Editing the note");
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1YWM3MDk4ZWUwNTZkODc0ZWQ4OTM2In0sImlhdCI6MTY2Njk3NDQ5MH0.WhuO2MoReJoBQW9XiGpMUPjKxfaSPd6JB_ZGO9f_22w'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
    console.log(notes)


  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;