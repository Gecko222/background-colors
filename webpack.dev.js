const merge = require('lodash/merge');
const webpackConfig = require('./webpack.common');

const dev = {
  mode: 'development',
};

module.exports = merge(webpackConfig, dev);
