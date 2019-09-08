'use strict';

const pageList = [
    ['/', '/index'],
    ['/catalogue/:type', '/catalogue/[type]'],
    ['/paper/:id', '/paper/[id]'],
    ['/profile/:uuid', '/profile/[uuid]'],
    ['/paper-submit/:id', '/paper-submit/[id]'],
];

const page = (router, app) => {
    // used for page request
    pageList.forEach(async pageItem => {
        router.get(pageItem[0], async ctx => {
            await app.render(ctx.req, ctx.res, pageItem[1], ctx.query);

            ctx.respond = false;
        });
    });

    return router;
};

module.exports = page;