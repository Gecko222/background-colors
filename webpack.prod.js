const merge = require('lodash/merge');
const webpackConfig = require('./webpack.common');

const dev = {
  mode: 'production',
};

module.exports = merge(webpackConfig, dev);
