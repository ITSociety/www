const express = require('express');
const contentfulRoute = require('./contentful');

const router = express.Router();

router.use('/contentful', contentfulRoute);

router.get('/', (req, res) => res.send('Welcome to api'));

module.exports = router;
