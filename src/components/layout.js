import Head from 'next/head';

import 'style/app.scss';

const Layout = function(props) {
    const { children } = props;

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div id="root">
                { children }
            </div>
        </>
    );
};

export default Layout;