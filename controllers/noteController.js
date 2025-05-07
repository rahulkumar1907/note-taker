const Note = require('../models/Note');
const fetchCatFact = require('../utils/catFactService');

// Create Note
exports.createNote = async (req, res, next) => {
    try {
        logger.info("Inside create note api", { body: req.body });
        const { title, content } = req.body;
        const existingNote = await Note.findOne({ title: title.trim(), isDeleted: false });
        if (existingNote) {
            logger.warn("Note with this title already exists", { title });
            return res.status(400).json({ status: false, message: "A note with this title already exists." });
        }
        const catfact = await fetchCatFact();
        logger.info("Catfact fetched:", catfact);

        const note = await Note.create({ title, content, catfact });
        logger.info("Note created:", note);
        return res.status(201).json({ status: true, message: "Notes created successfully", data: note });
    } catch (error) {
        logger.error("Error creating note:", error.message);
        next(error);
    }
};

// Get All Notes
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ isDeleted: false }).select({ __v: 0 });
        logger.info("Fetched notes:", notes);
        return res.status(200).json({ status: true, message: "All notes retrieved successfully", data: notes });
    } catch (error) {
        logger.error("Error fetching notes:", error.message);
        next(error);
    }
};

// Delete Note
exports.deleteNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        logger.info("Note ID to delete:", noteId);
        const note = await Note.findByIdAndUpdate(
            noteId,
            { isDeleted: true },
            { new: true }
        );

        if (!note) return res.status(404).json({ status: false, message: "Note not found" });
        logger.info("Note deleted:", note);
        return res.status(200).json({ status: true, message: "Note deleted successfully" });
    } catch (error) {
        logger.error("Error deleting note:", error.message);
        next(error);
    }
};


// Search Notes
exports.searchNotes = async (req, res, next) => {
    try {
        const query = req.query.q;
        logger.info("Search query:", query);
        const notes = await Note.find({
            isDeleted: false,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { catfact: { $regex: query, $options: 'i' } }
            ]
        }).select({ __v: 0 });
        logger.info("Search results:", notes);
        return res.status(200).json({ status: true, message: "Search result retrieved successfully", data: notes });
    } catch (error) {
        logger.error("Error searching notes:", error.message);
        next(error);
    }
};

