const express = require('express');
const { client, getEntry, prettifyEvent } = require('./util');

const contentfulApi = express.Router();

const getEvents = getEntry('event');
const getCommittee = getEntry('committee');

// main welcome
contentfulApi.get('/', (req, res) => res.send('Welcome to Contentful API'));

/**
 * events api
 */

// GET all events
contentfulApi.get('/events', async (req, res) => {
  const events = await getEvents();
  const parsed = events.map(prettifyEvent);
  res.json(parsed);
});

// GET only old or new events
contentfulApi.get('/events/:classifier', async (req, res) => {
  const { classifier } = req.params;
  const events = await getEvents();
  const now = new Date();
  // assume that the user's after the most recent events
  let filtered = events.filter(ev => new Date(ev.fields.startTime) > now);

  // if we're after previous events
  if (classifier.toLowerCase() === 'past') {
    filtered = events.filter(ev => new Date(ev.fields.startTime) < now);
  }
  const resp = filtered.map(prettifyEvent);
  res.json(resp);
});

// GET an event of a certain id
contentfulApi.get('/event/:id', async (req, res) => {
  const { id } = req.params;
  const event = await client.getEntry(id);
  const { fields, sys } = event;

  // format the event nicely
  const resp = {
    id: sys.id,
    name: fields.eventName,
    price: fields.eventPrice,
    type: fields.eventType,
    details: fields.additionalDetails,
    location: fields.eventLocation,
    timing: {
      start: fields.startTime,
      end: fields.endTime,
    },
    lastUpdated: sys.updatedAt,
  };
  res.json(resp);
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
