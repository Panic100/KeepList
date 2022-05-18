import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

// function createNotes(noteItem){
//     return (
//         <Note 
//             title={noteItem.title}
//             content={noteItem.content}
//         />
//     );
// }




function App() {
    const [notes, setNotes] = React.useState([{}]);
    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/keepList`, { headers: { "Content-Type": "application/json" } })
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    setNotes(res.data);
                })
        }
        catch (err) {
            console.log(err);
        }
    }, [])
    console.log(notes);



    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }


    function deleteNote(id) {
        // console.log(id);
        setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
                return id !== index;
            })
        })
        
        axios.delete(`http://localhost:5000/del/${notes[id]._id}?_method=DELETE`, { headers: { "Content-Type": "application/json" } })
                .then(res => {
                    console.log(notes[id]._id);
                })
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (<Note
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />)
            })}
            <Footer />
        </div>
    );
};

export default App;