const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const envConfig = require('./config');

const useFileSystemPublicRoutes = false;
const assetPrefix = envConfig.dev ? '' : envConfig.ossPublic.assetPrefix;
const cssLoaderOptions = {
    url: false,
};
const webpack = function(config, options) {
    config.resolve = config.resolve || {};
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
        'components': path.resolve(__dirname, 'src/components'),
        'style': path.resolve(__dirname, 'src/style'),
        'lib': path.resolve(__dirname, 'src/lib'),
        'plugins': path.resolve(__dirname, 'src/plugins'),
        'config': path.resolve(__dirname, 'config'),
    });

    return config;
};

module.exports = withCSS(withSass({
    useFileSystemPublicRoutes,
    assetPrefix,
    cssLoaderOptions,
    webpack,
}));