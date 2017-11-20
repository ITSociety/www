const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);


const setKey = (key, val) => new Promise((res, rej) => {
  const stringified = JSON.stringify(val);
  client.set(key, stringified, (err, reply) => {
    if (err) rej(err);
    res(reply);
  });
});

const getByKey = key => new Promise((res, rej) => {
  client.get(key, (err, reply) => {
    if (err) rej(err);
    !reply
      ? res({ found: false, data: '' })
      : res({ found: true, data: JSON.parse(reply.toString()) });
  });
});


const getKeys = key => new Promise((res, rej) => {
  client.keys(key, (err, replies) => {
    if (err) rej(err);
    res(replies);
  });
});

const delKey = key => new Promise(res => client.del(key, res));

