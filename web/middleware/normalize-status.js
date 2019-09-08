'use strict';

module.exports = async (ctx, next) => {
    // used for set response status code, replace 404 as 200
    ctx.res.statusCode = 200;

    await next();
};