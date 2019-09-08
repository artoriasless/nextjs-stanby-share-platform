'use strict';

const source = (router, app) => {
    // used for assets request in local development environment
    const handle = app.getRequestHandler();

    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res);

        ctx.respond = false;
    });

    return router;
};

module.exports = source;