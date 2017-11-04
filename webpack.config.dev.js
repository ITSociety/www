const path = require('path');

const outPath = path.join(__dirname, 'public', 'build');
const outFile = 'bundle.js';

module.exports = {
  entry: ['babel-polyfill', './src/client/router.jsx'],
  output: {
    path: outPath,
    filename: outFile,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['ie >= 11'],
                },
              },
            ],
            'react',
          ],
        },
      },
    ],
  },
};
