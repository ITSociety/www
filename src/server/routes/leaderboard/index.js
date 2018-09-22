const express = require('express');
const populateList = require('./scrape');

const scraper = express.Router();
let leaderboard = [];

const updateLeaderboard = async () => {
  console.log('Beginning scrape...');
  const hrstart = process.hrtime();
  const list = await populateList();
  const hrend = process.hrtime(hrstart);
  const taken = `Execution time: ${hrend[0]}${(hrend[1] / 1000000)}ms`;
  console.log(`Scrape complete. ${taken}`);
  leaderboard = list;
};

updateLeaderboard().then(() => setInterval(updateLeaderboard, 60000));

scraper.get('/', (req, res) => res.json(leaderboard));

scraper.get('/uncached', (req, res) => {
  populateList().then(list => res.json(list));
});

module.exports = scraper;
