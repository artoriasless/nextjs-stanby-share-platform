import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

import {
    Layout
} from 'components';

const Paper = withRouter(function(props) {
    const { query } = props.router || {};
    const {
        id = ''
    } = query || {};

    return (
        <>
            <Head>
                <title>Paper Page { id }</title>
            </Head>
            <Layout>
                <h1>Paper Page</h1>
                <div>
                    <h2>paper id : { id }</h2>
                    <div>
                        this is paper content
                    </div>
                </div>
            </Layout>
        </>
    );
});

export default Paper;