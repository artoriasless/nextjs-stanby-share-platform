'use strict';

const Router = require('koa-router');

const page = require('./page');
const api = require('./api');
const source = require('./source');

const initRouter = app => {
    let router = new Router();

    router = page(router, app);
    router = api(router, app);
    router = source(router, app);

    return router;
};

module.exports = initRouter;