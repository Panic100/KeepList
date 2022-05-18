import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Zoom } from "@material-ui/core";
import axios from "axios";

function CreateArea(props) {

    const [note, setNote] = React.useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const addNote = async (event) => {
        props.onAdd(note);
        try {
            axios.post(`http://localhost:5000/keepList`, note, { headers: { "Content-Type": "application/json" } })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
        catch (err) {
            console.log(err);
        }
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }


    const [isExpand, setExpand] = useState(false);
    function expand() {
        setExpand(true);
    }


    return (
        <div>
            <form className="create-note">
                {isExpand && <input name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title" />}
                <textarea name="content"
                    onClick={expand}
                    value={note.content}
                    onChange={handleChange}
                    placeholder="Take a note..."
                    rows={isExpand ? 3 : 1} />
                <Zoom in={isExpand}>
                    <Fab onClick={addNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
