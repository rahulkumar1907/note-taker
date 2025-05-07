const express = require('express');
const router = express.Router();
const {
    createNote,
    getNotes,
    deleteNote,
    searchNotes
} = require('../controllers/noteController');
const { validateNote, validateNoteId, validateSearchQuery } = require('../middlewares/validators/noteValidator');
router.post('/', validateNote, createNote);
router.get('/', getNotes);
router.delete('/:id', validateNoteId, deleteNote);
router.get('/search', validateSearchQuery, searchNotes);

module.exports = router;
