const express = require('express');
const contentfulRoutes = require('./contentful');
const leaderRoutes = require('./leaderboard');

const router = express.Router();

router.use('/contentful', contentfulRoutes);
router.use('/leaderboard', leaderRoutes);

router.get('/', (req, res) => res.send('Welcome to api'));

module.exports = router;
