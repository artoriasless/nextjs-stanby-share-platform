'use strict';

const koaCors = require('koa2-cors');

const config = require('../../../config');

const GET = 'GET';
const POST = 'POST';
const cors = config.dev;
const apiList = [
    ['/api/test', cors, GET, async ctx => { ctx.body = {test: 'test GET'}; }],
    ['/api/test', cors, POST, async ctx => { ctx.body = {test: 'test POST'}; }],
];

const api = (router, app) => {
    // used for api request
    apiList.forEach(apiItem => {
        if (apiItem[1]) {
            switch(apiItem[2]) {
            case GET:
                router.get(apiItem[0], koaCors(), apiItem[3]);
                break;
            case POST:
                router.post(apiItem[0], koaCors(), apiItem[3]);
                break;
            default:
                // do nothing
            }
        } else {
            switch(apiItem[2]) {
            case GET:
                router.get(apiItem[0], apiItem[3]);
                break;
            case POST:
                router.post(apiItem[0], apiItem[3]);
                break;
            default:
                // do nothing
            }
        }
    });

    return router;
};

module.exports = api;