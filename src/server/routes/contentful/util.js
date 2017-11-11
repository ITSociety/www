const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS,
});


// abstract Contentful#getEntries in to something nicer to use
const getEntry = entry => async () => {
  const query = { include: 3, content_type: entry };
  const { items } = await client.getEntries(query);
  return items;
};


// in order to save on network traffic, only send import info
const prettifyEvent = ev => ({
  id: ev.sys.id,
  name: ev.fields.eventName,
  start: ev.fields.startTime,
  details: ev.fields.additionalDetails,
});


module.exports = {
  client,
  getEntry,
  prettifyEvent,
};
