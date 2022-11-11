import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const s1 = {
        "name" : "varaliya",
        "class" : "14a"
    };

    const [state, setState] = useState(s1);

    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;