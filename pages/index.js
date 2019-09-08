import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import {
    Alert,
} from 'react-bootstrap';

import {
    Layout
} from 'components';

const Home = function() {
    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
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

export default Home;