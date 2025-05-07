const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Middleware for note creation validation
exports.validateNote = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title must be less than 100 characters'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error("Validation errors during note creation", { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }
        logger.info("Validation passed for note creation", { body: req.body });
        next();
    }
];

// Middleware to validate note ID
exports.validateNoteId = [
    param('id')
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid note ID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error("Validation errors for note ID", { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }
        logger.info("Validation passed for note ID", { id: req.params.id });
        next();
    }
];

// Middleware to validate search query
exports.validateSearchQuery = [
    query('q')
        .trim()
        .notEmpty()
        .withMessage('Search query (q) is required')
        .isLength({ min: 2 })
        .withMessage('Search query must be at least 2 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error("Validation errors in search query", { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }
        logger.info("Validation passed for search query", { query: req.query.q });
        next();
    }
];
