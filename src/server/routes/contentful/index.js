const express = require('express');
const {
  client, getEntry, prettifyEvent, sortEvents, formatCommitteeMember,
} = require('./util');
const logger = require('../../../logger')('contentful');

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
  logger('Attempting to serve events @ GET /events');
  const events = await getEvents();
  logger('Attempting to parse events @ GET /events');
  const parsed = events.sort(sortEvents).map(prettifyEvent);
  logger('Sending events to client @ GET /events');
  res.json(parsed);
});

// GET only old or new events
contentfulApi.get('/events/:classifier', async (req, res) => {
  const { classifier } = req.params;
  logger('Attempting to get events from contentful @ GET /events/:classifier');
  const events = await getEvents();
  const now = new Date();
  logger('Filtering events @ GET /events/:classifier');
  // assume that the user's after the most recent events
  let filtered = events.filter(ev => new Date(ev.fields.startTime) < now);

  // if we're after previous events
  if (classifier.toLowerCase() === 'future') {
    filtered = events.filter(ev => new Date(ev.fields.startTime) > now);
  }
  logger('Prettifying events @ GET /events/:classifier');
  const resp = filtered.sort(sortEvents).map(prettifyEvent);
  res.json(resp);
});

// GET an event of a certain id
contentfulApi.get('/event/:id', async (req, res) => {
  const { id } = req.params;
  const event = await client.getEntry(id);
  const { sys, fields } = event;

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
  const prettyMembers = committeeMembers.map(formatCommitteeMember);
  res.json(prettyMembers);
});

contentfulApi.get('/committee/:id', async (req, res) => {
  const { id } = req.params;
  const members = await getCommittee();
  const member = members.filter(mbr => mbr.sys.id === id)[0];
  const { sys, fields } = member;
  const formatted = {
    id: sys.id,
    updated: sys.updatedAt,
    name: fields.memberName,
    year: fields.committeeYear,
    image: `https:${fields.memberPicture.fields.file.url}`,
    role: fields.memberRole,
    email: fields.memberEmailAddress,
    content: fields.memberContent,
  };
  res.json(formatted);
});


module.exports = contentfulApi;
