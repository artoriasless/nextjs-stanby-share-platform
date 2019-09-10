const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const envConfig = require('./config');

const compress = !envConfig.dev;
const useFileSystemPublicRoutes = false;
const assetPrefix = envConfig.dev ? '' : envConfig.ossPublic.assetPrefix;
const cssLoaderOptions = {
    url: false,
};
const sassLoaderOptions = {
    data: `$assetPrefix: "${assetPrefix}";`
};
const webpack = function(config, options) { // eslint-disable-line
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
    compress,
    useFileSystemPublicRoutes,
    assetPrefix,
    cssLoaderOptions,
    sassLoaderOptions,
    webpack,
}));