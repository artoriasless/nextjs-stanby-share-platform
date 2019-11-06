import React from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import config from 'config';
import {
    TitleGenerator,
    HeadGenerator,
    Layout,
} from 'components';

const Profile = withRouter(function(props) {
    const seo = props.seo || {};
    const { query } = props.router || {};
    const {
        uuid = ''
    } = query || {};

    return (
        <>
            <TitleGenerator title={ seo.title }/>
            <HeadGenerator seo={ seo }/>
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

Profile.getInitialProps = async () => {
    const seoRes = await fetch(`${config.domain}/api/util/seo?page=profile`);
    const seoResult = await seoRes.json();
    
    const initProps = {
        seo: seoResult.data,
    };

    return initProps;
};

export default Profile;