module.exports = (err, req, res, next) => {
    logger.error("error", err.message);
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server Error', error: err.message });
};
