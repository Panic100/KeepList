const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/KeepList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const NoteS = mongoose.model("NoteS", notesSchema);

NoteS.createIndexes();

// For backend and express
const app = express();

app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Keep List application." });
});

app.get("/keepList", function (req, res, next) {

    NoteS.find((err, docs) => {
        try {
            console.log(docs);
            res.send(docs);
        }
        catch (er) {
            console.log(er);
        }
    });

});

app.post("/keepList", async (req, resp) => {
    try {
        const notes = new NoteS(req.body);
        let result = await notes.save();
        result = result.toObject();
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.delete("/del/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const d = await NoteS.findByIdAndDelete(id);
        res.render("/");
    }
    catch (err) {
        console.log(err);
    }
});


app.listen("5000", () => {
    console.log(`Server is running.`);
});