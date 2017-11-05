const express = require('express');
const contentful = require('contentful');

const contentfulApi = express.Router();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS,
});

// main welcome
contentfulApi.get('/', (req, res) => res.send('Welcome to Contentful API'));

/**
 * events api
 */

const getEntry = entry => async () => {
  const query = { include: 3, content_type: entry };
  const { items } = await client.getEntries(query);
  return items;
};

const getEvents = getEntry('event');

// GET all events
contentfulApi.get('/events', async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

// GET only old or new events
contentfulApi.get('/events/:classifier', async (req, res) => {
  const { classifier } = req.params;
  const events = await getEvents();
  if (classifier === 'past') {
    const filtered = events.filter(ev => new Date(ev.fields.startTime) < new Date());
    res.json(filtered);
  } else if (classifier === 'future') {
    const filtered = events.filter(ev => new Date(ev.fields.startTime) > new Date());
    res.json(filtered);
  }
  res.status(400).send('Invalid query');
});

// GET an event of a certain id
contentfulApi.get('/event/:id', async (req, res) => {
  const { id } = req.params;
  const event = await client.getEntry(id);
  res.json(event);
});


/**
 * committee api
 */
contentfulApi.get('/committee', async (req, res) => {

});

contentfulApi.get('/committee/:id', async (req, res) => {
  const { id } = req.params;
});


module.exports = contentfulApi;
