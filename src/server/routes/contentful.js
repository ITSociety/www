const express = require('express');
const contentful = require('contentful');

const contentfulApi = express.Router();

contentfulApi.get('/', (req, res) => res.send('Welcome to Contentful API'));

module.exports = contentfulApi;
