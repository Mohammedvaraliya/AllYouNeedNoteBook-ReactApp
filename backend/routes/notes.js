const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All te Notes using : GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a New Note using : POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {



        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using : PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title){
        newNote.title = title
    };
    if (description){
        newNote.description = description
    };
    if (tag){
        newNote.tag = tag
    };

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note){
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id){
        return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});

})

// ROUTE 4: Delete an existing Note using : DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }

    // Allow deletion only if user own this Note
    if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success" : "Note haas been deleted!", note:note });

})
module.exports = router