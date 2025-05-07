const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
global.logger = require('./utils/logger');
app.use(cors());
app.use(express.json());
const requestLogger = require('./middlewares/loggerMiddleware');
app.use(requestLogger);
// Routes
app.use('/api/notes', require('./routes/noteRoutes'));

// Error handling
app.use(errorHandler);

module.exports = app;
