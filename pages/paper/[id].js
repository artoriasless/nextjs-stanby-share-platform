import React from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import config from 'config';
import {
    TitleGenerator,
    HeadGenerator,
    Layout,
} from 'components';

const Paper = withRouter(function(props) {
    const seo = props.seo || {};
    const { query } = props.router || {};
    const {
        id = ''
    } = query || {};

    return (
        <>
            <TitleGenerator title={ seo.title }/>
            <HeadGenerator seo={ seo }/>
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

Paper.getInitialProps = async () => {
    const seoRes = await fetch(`${config.domain}/api/util/seo?page=paper`);
    const seoResult = await seoRes.json();
    
    const initProps = {
        seo: seoResult.data,
    };

    return initProps;
};

export default Paper;