module.exports = (req, res, next) => {
    const { method, url, headers, body, query } = req;

    logger.info(`Incoming Request → ${method} ${url}
    - Headers: ${JSON.stringify(headers)}
    - Query: ${JSON.stringify(query)}
    - Body: ${JSON.stringify(body)}
    `);

    next();
};
