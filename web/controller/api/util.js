'use strict';

const {
    seoTpl,
} = require('../../lib/constant');

const util = {
    seo: async ctx => {
        const pageType = ctx.query.page || '';
        const result = {
            success: true,
            message: 'fetch seo data success.',
            data: {},
        };

        switch (pageType) {
        case 'home':
            result.data = seoTpl.home;
            break;
        default:
            result.data = seoTpl.unknown;
        }

        ctx.body = result;
    },
};

module.exports = util;