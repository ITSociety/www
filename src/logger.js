/* eslint-disable */
module.exports = prefix => (msg, module) => {
  if (process.env.ENABLE_LOGS === 'true') {
    console.log(`[${prefix}] ${msg} @ ${module}`);
  }
};
/* eslint-enable */
