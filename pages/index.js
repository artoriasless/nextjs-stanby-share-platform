import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

import {
    Alert,
} from 'react-bootstrap';

import config from 'config';
import {
    TitleGenerator,
    HeadGenerator,
    Layout,
} from 'components';

const Home = function(props) {
    const seo = props.seo || {};

    return (
        <>
            <TitleGenerator title={ seo.title }/>
            <HeadGenerator seo={ seo }/>
            <Layout>
                <h1>Home Page</h1>
                <div>
                    <h2>Catalogue List</h2>
                    <ul>
                        <li>
                            <Link href="/catalogue/[type]" as="/catalogue/all">
                                <a>Catalogue - all</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalogue/[type]" as="/catalogue/office">
                                <a>Catalogue - office</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalogue/[type]" as="/catalogue/game">
                                <a>Catalogue - game</a>
                            </Link>
                        </li>
                    </ul>
                    <h2>User Center</h2>
                    <Link href="/profile/[uuid]" as="/profile/1234-abcd-efgh-5678-xyz">
                        <a>user center</a>
                    </Link>
                    <h2>Bootstrap Component Test</h2>
                    <Alert variant="primary">
                        This is a primary alert—check it out!
                    </Alert>
                </div>
            </Layout>
        </>
    );
};

Home.propTypes = {
    seo: PropTypes.object,
};
Home.getInitialProps = async () => {
    const seoRes = await fetch(`${config.domain}/api/util/seo?page=home`);
    const seoResult = await seoRes.json();
    
    const initProps = {
        seo: seoResult.data,
    };

    return initProps;
};

export default Home;