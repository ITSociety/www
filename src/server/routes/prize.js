const express = require('express');

const prizeApi = express.Router();

prizeApi.get('/', (req, res) => {
  res.send('Welcome to prize api');
});

module.exports = prizeApi;
