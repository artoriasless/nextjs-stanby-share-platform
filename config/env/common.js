'use stirct';

const path = require('path');

const pkg = require('../../package.json');

const staticFolder = 'share-platform';
const staticVersion = pkg.version;
const domain = '//monkingstand.oss-cn-beijing.aliyuncs.com';
const assetPrefix = `${domain}/${staticFolder}/${staticVersion}`;
const userPrefix = `${domain}/${staticFolder}/user`;;
const paperPrefix = `${domain}/${staticFolder}/paper`;;

module.exports = {
    dev: process.env.NODE_ENV !== 'production',
    sessionKeys: [
        'user'
    ],
    session: {
        key: 'koa-share-platform-session',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    },
    ossPublic: {
        domain,
        assetPrefix,
        userPrefix,
        paperPrefix,
        staticFolder,
        staticVersion,
    },
};
