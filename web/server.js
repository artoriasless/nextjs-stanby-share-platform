'use strict';

const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const koaSession = require('koa-session');
const koaLogger = require('koa-logger');
const next = require('next');

const koaLoggerTransporter = require('./lib/koa-logger-transporter');
const normalizeStatus = require('./middleware/normalize-status');

const config = require('../config');
const initRouter = require('./controller/init-router');

const app = next({
    dev: config.dev,
});

app.prepare().then(() => {
    const server = new Koa();
    const router = initRouter(app);

    server.keys = config.sessionKeys;
    server.use(normalizeStatus)
        .use(koaSession(config.session, server))
        .use(koaBody())
        .use(koaLogger({transporter: koaLoggerTransporter}))
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(config.port);
});