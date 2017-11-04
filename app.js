const express = require('express');
const logger = require('morgan')('dev');
const path = require('path');

const app = express();
const index = path.join(__dirname, 'public', 'layout.html');
const pub = path.join(__dirname, 'public');

app.use('/public', express.static(pub));

app.use(logger);

// this middleware goes at the end, so as to not interfere with other endpoints
app.get('/', (req, res) => res.sendFile(index));

module.exports = app;
