import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import config from 'config';

const HeadGenerator = function(props) {
    const {
        seo,
        children,
    } = props;
    const favUrl = `${config.dev ? '' : config.ossPublic.assetPrefix}/static/favicon.ico`;

    return (
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="icon" type="image/x-icon" href={ favUrl }/>
            <link rel="shortcut icon" type="image/x-icon" href={ favUrl }/>

            <meta name="Description" content={ seo.description }></meta>
            <meta property="og:title" content={ seo.title }></meta>
            <meta property="og:description" content={ seo.description }></meta>
            <meta name="keywords" content={ seo.keywords }></meta>

            { children }
        </Head>
    );
};

HeadGenerator.propTypes = {
    seo: PropTypes.object,
    children: PropTypes.array,
};

export default HeadGenerator;