import Head from 'next/head';

import config from 'config';

import 'style/app.scss';

const Layout = function(props) {
    const { children } = props;
    const favUrl = `${config.dev ? '' : config.ossPublic.assetPrefix}/static/favicon.ico`;

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="icon" type="image/x-icon" href={ favUrl }/>
                <link rel="shortcut icon" type="image/x-icon" href={ favUrl }/>
            </Head>
            <div id="root">
                { children }
            </div>
        </>
    );
};

export default Layout;