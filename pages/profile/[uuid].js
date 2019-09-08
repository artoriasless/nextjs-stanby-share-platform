import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

import {
    Layout
} from 'components';

const Profile = withRouter(function(props) {
    const { query } = props.router || {};
    const {
        uuid = ''
    } = query || {};

    return (
        <>
            <Head>
                <title>User Center { uuid }</title>
            </Head>
            <Layout>
                <h1>User Center Page</h1>
                <div>
                    <h2>user uuid : { uuid }</h2>
                    <div>
                        this is user center content
                    </div>
                </div>
            </Layout>
        </>
    );
});

export default Profile;