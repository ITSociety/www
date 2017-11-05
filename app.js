// app libs
const express = require('express');
const compression = require('compression')();
const logger = require('morgan')('dev');
const helmet = require('helmet')();
const cors = require('cors')();
const path = require('path');

// import the api
const api = require('./src/server/routes');

// local deps
const app = express();
const index = path.join(__dirname, 'public', 'layout.html');
const pub = path.join(__dirname, 'public');

/**
 * set up middlewares
 */
app.use(logger);
app.use(compression);
app.use(helmet);
app.use(cors); // open the api to everyone

/**
 * set up routes
 */
app.use('/public', express.static(pub));
app.use('/api', api);

/**
 * this middleware goes at the end, so as to not interfere with other endpoints
 */
app.get('*', (req, res) => res.sendFile(index));

module.exports = app;
