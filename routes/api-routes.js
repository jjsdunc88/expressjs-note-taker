const router = require('express').Router();
const db = require('../db/db.json')
const uuid = require("../helpers/uuid")
const fs = require('fs')
const path = require('path')
// let dbDelete = db;

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});


router.get('/notes', (req, res) => res.json(db));




router.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        db.push(newNote);

        const noteString = JSON.stringify(db);


        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Note for ${newNote.title} has been written to JSON file`
                )
        );
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
}
);


router.delete('/notes/:id', (req, res) => {

    const idToDelete = req.params.id;

    const dbDelete = db.filter((note) => note.id !== idToDelete);

    const noteString = JSON.stringify(dbDelete);

    fs.writeFile(`./db/db.json`, noteString, (err) => {
        err
            ? console.error(err)
            : console.log(
                // `Note for ${newNote.title} has been written to JSON file`
            )
        res.send();
    });

});



module.exports = router;