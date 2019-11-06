'use strict';

const confList = [
    // routerUrl, fileUrl
    ['/', '/index'],
    ['/catalogue/:type', '/catalogue/[type]'],
    ['/paper/:id', '/paper/[id]'],
    ['/profile/:uuid', '/profile/[uuid]'],
    ['/paper-submit/:id', '/paper-submit/[id]'],
];

const controllerFunc = (app, router, routerUrl, fileUrl) => {
    router.get(routerUrl, async ctx => {
        await app.render(ctx.req, ctx.res, fileUrl, ctx.query);

        ctx.respond = false;
    });
};
const page = (router, app) => {
    // used for page request
    confList.forEach(async confItem => {
        const [
            routerUrl, fileUrl,
        ] = confItem;
        
        controllerFunc(app, router, routerUrl, fileUrl);
    });

    return router;
};

module.exports = page;