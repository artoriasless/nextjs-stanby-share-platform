import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const TitleGenerator = function(props) {
    const title = props.title || '';

    return (
        <Head>
            <title>
                { title }
            </title>
        </Head>
    );
};

TitleGenerator.propTypes = {
    title: PropTypes.string,
};

export default TitleGenerator;