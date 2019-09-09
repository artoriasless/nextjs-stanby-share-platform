'use strict';

const _ = require('lodash');

const commonConfig = require('./env/common');
const mailOpts = require('./email-config');
const ossOpts = require('./oss-config');
const dbOpts = require('./db-connect');

let envConfig;

if (commonConfig.dev) {
    envConfig = require('./env/development');
} else {
    envConfig = require('./env/production');
    envConfig.db = dbOpts;
}

envConfig.ossOpts = ossOpts;
envConfig.mailOpts = mailOpts;

module.exports = _.merge(commonConfig, envConfig);
