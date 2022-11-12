import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "635c192e5a25129bc579350c3b",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy updated",
          "description": "Hello You Good Boy updated",
          "tag": "bruhs",
          "date": "2022-10-28T18:02:22.258Z",
          "__v": 0
        },
        {
          "_id": "636a48b172119ab51763ff61df9",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:49.462Z",
          "__v": 0
        },
        {
          "_id": "636a48b27912321ab51763ff61dfb",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:50.325Z",
          "__v": 0
        },
        {
          "_id": "636a48b279a121b51763ff61dfd",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:50.529Z",
          "__v": 0
        },
        {
          "_id": "636a48b279a1321b51763ff61dff",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:50.776Z",
          "__v": 0
        },
        {
          "_id": "636a48b2791223ab51763ff61e01",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:50.951Z",
          "__v": 0
        },
        {
          "_id": "636a48b37912ab51763ff61e03",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:51.127Z",
          "__v": 0
        },
        {
          "_id": "636a48b379ab23151763ff61e05",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:51.453Z",
          "__v": 0
        },
        {
          "_id": "636a48b3793ab51763ff61e07",
          "user": "635ac7098ee056d874ed8936",
          "title": "goodBoy",
          "description": "Hello You Good Boy",
          "tag": "bruhs",
          "date": "2022-11-08T12:16:51.712Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);

      // Add a Note
      const addNote = (title, description, tag) =>{
        console.log("Adding a new note")
        // TODO : API call
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
      const deleteNote = (id) =>{
        
      }

      // Edit a Note
      const editNote = (id) =>{
        
      }



    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;