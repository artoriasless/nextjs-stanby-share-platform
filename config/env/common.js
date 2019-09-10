'use stirct';

const pkg = require('../../package.json');

const staticFolder = 'share-platform';
const staticVersion = pkg.version;
const domain = '//monkingstand.oss-cn-beijing.aliyuncs.com';
const assetFolder = `${staticFolder}/${staticVersion}`;
const userPrefix = `${domain}/user`;
const assetPrefix = `${domain}/${staticFolder}/${staticVersion}`;
const paperPrefix = `${domain}/${staticFolder}/paper`;

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
        assetFolder,
        userPrefix,
        assetPrefix,
        paperPrefix,
        staticFolder,
        staticVersion,
    },
};
