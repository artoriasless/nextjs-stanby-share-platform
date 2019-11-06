import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import config from 'config';
import {
    TitleGenerator,
    HeadGenerator,
    Layout,
} from 'components';

const Catalogue = withRouter(function(props) {
    const seo = props.seo || {};
    const { query } = props.router || {};
    const {
        type = ''
    } = query || {};

    const paperIds = !type ? [] : [
        type.charCodeAt(0) + 1,
        type.charCodeAt(0) + 2,
        type.charCodeAt(0) + 3,
    ];

    return (
        <>
            <TitleGenerator title={ seo.title }/>
            <HeadGenerator seo={ seo }/>
            <Layout>
                <h1>Catalogue Page</h1>
                <div>
                    <h2>catalogue type : { type }</h2>
                    <ul>
                        {
                            paperIds.map(id => (
                                <li key={ `paper_link_item_${id}` }>
                                    <Link href="/paper/[id]" as={ `/paper/${id}` }>
                                        <a>paper - { id }</a>
                                    </Link>
                                    <br/>
                                    <Link href="/paper-submit/[id]" as={ `/paper-submit/${id}` }>
                                        <a>paper edit - { id }</a>
                                    </Link>
                                    <br/>
                                    <Link href="/paper-submit/[id]" as="/paper-submit/0">
                                        <a>paper add</a>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Layout>
        </>
    );
});

Catalogue.getInitialProps = async () => {
    const seoRes = await fetch(`${config.domain}/api/util/seo?page=catalogue`);
    const seoResult = await seoRes.json();
    
    const initProps = {
        seo: seoResult.data,
    };

    return initProps;
};

export default Catalogue;