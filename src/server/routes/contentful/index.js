const express = require('express');
const {
  client, getEntry, prettifyEvent, sortEvents, formatCommittee,
} = require('./util');

const contentfulApi = express.Router();

const getEvents = getEntry('event');
const getCommittee = getEntry('committeeMember');

// main welcome
contentfulApi.get('/', (req, res) => res.send('Welcome to Contentful API'));

/**
 * events api
 */

// GET all events
contentfulApi.get('/events', async (req, res) => {
  const events = await getEvents();
  const parsed = events.sort(sortEvents);
  res.json(parsed);
});

// GET only old or new events
contentfulApi.get('/events/:classifier', async (req, res) => {
  const { classifier } = req.params;
  const events = await getEvents();
  const now = new Date();
  // assume that the user's after the most recent events
  let filtered = events.filter(ev => new Date(ev.fields.startTime) < now);

  // if we're after previous events
  if (classifier.toLowerCase() === 'future') {
    filtered = events.filter(ev => new Date(ev.fields.startTime) > now);
  }
  const resp = filtered.sort(sortEvents).map(prettifyEvent);
  res.json(resp);
});

// GET an event of a certain id
contentfulApi.get('/event/:slug', async (req, res) => {
  const { items: [{ sys, fields }] } = await client.getEntries({
    content_type: 'event',
    'fields.slug': req.params.slug,
  });

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
  const committeeMembers = await getCommittee();
  const prettyMembers = committeeMembers.map(formatCommittee);
  res.json(prettyMembers);
});

contentfulApi.get('/member/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const { items: [member] } = await client.getEntries({
    content_type: 'committeeMember',
    'fields.memberName': name,
  });

  res.json(formatCommittee(member));
});


module.exports = contentfulApi;
