const prod = require('./webpack.config.prod');
const dev = require('./webpack.config.dev');

// if (process.env.NODE_ENV !== 'production') {
module.exports = dev;
// } else {
// module.exports = prod;
// }
