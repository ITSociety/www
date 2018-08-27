const contentful = require('contentful');

// init client
const client = contentful.createClient({
  space: process.env.CF_SPACE,
  accessToken: process.env.CF_ACCESS,
});

/**
 * abstract ContentfulClient#getEntries and curry
 * @param {String} entry entry type
 */
const getEntry = entry => async () => {
  const query = { include: 3, content_type: entry };
  const { items } = await client.getEntries(query);
  return items.filter(it => 'fields' in it);
};

/**
 * Sorts event by their startTime field.
 * @param {Object} ev1 First event for comparison
 * @param {Object} ev2 Second event for comparison
 */
const sortEvents = (ev1, ev2) => {
  const ev1Start = new Date(ev1.fields.startTime);
  const ev2Start = new Date(ev2.fields.startTime);
  if (ev1Start < ev2Start) {
    return 1;
  } else if (ev1Start > ev2Start) {
    return -1;
  }
  return 0;
};

/**
 *  in order to save on network traffic, only send import information
 * @param {Object} ev Event to format
 */
const prettifyEvent = ({ sys, fields }) => {
  const image = 'optionalImage' in fields ? `https:${fields.optionalImage.fields.file.url}` : 'not found';
  return {
    id: sys.id,
    name: fields.eventName,
    start: fields.startTime,
    details: fields.additionalDetails,
    image,
  };
};

/**
 * See above. Provides better formatting for transit
 * @param {Object} member Member to format
 */
const formatCommitteeMember = ({ sys, fields }) => ({
  id: sys.id,
  updated: sys.updatedAt,
  name: fields.memberName,
  year: fields.committeeYear,
  image: `https:${fields.memberPicture.fields.file.url}`,
  role: fields.memberRole,
  email: fields.memberEmailAddress,
});


module.exports = {
  formatCommitteeMember,
  prettifyEvent,
  sortEvents,
  getEntry,
  client,
};
