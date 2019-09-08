'use strict';

const _ = require('lodash');

const commonConfig = require('./env/common');

let envConfig;

if (commonConfig.dev) {
    envConfig = require('./env/development');
} else {
    envConfig = require('./env/production');
}

module.exports = _.merge(commonConfig, envConfig);
