'use strict';

module.exports = {
    domain: 'http://127.0.0.1:3100',
    port: 3100,
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345',
        database: 'share_platform',
        seq_options: {
            logging: false,
            dialectOptions: {
                charset: 'utf8',
            },
        },
    },
    owners: [],
};
