'use strict';

const _ = require('lodash');

const commonConfig = require('./env/common');
let mailOpts;
let ossOpts;
let dbOpts;
let envConfig;

try {
    mailOpts = require('./email-config');
    ossOpts = require('./oss-config');
    dbOpts = require('./db-connect');
} catch(err) {
    mailOpts = {};
    ossOpts = {};
    dbOpts = {};
}

if (commonConfig.dev) {
    envConfig = require('./env/development');
} else {
    envConfig = require('./env/production');
    envConfig.db = dbOpts;
}

envConfig.ossOpts = ossOpts;
envConfig.mailOpts = mailOpts;

module.exports = _.merge(commonConfig, envConfig);
