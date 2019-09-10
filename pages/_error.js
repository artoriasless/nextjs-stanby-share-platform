import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import config from 'config';
import {
    Layout,
} from 'components';

const assetPrefix = config.dev ? '' : config.ossPublic.assetPrefix;
const errMsgMap = {
    '4': 'PAGE NOT FOUNND',
    '5': 'ERROR IN SERVER',
};
const Error = function(props) {
    const { statusCode } = props;
    const [count, setCount] = useState(5);
    const errMsg = `${statusCode} — ${errMsgMap[String(statusCode).charAt(0)] || 'UNKNOWN ERROR'}`;
    const msgContent = 'There\'s something wrong happened, please check the url is right, or try to refresh the page later...';
    const goHomepage = count > 0 ? `Go To Homepage in ${count} senond(s)` : 'Ready To Go Homepage...';

    useEffect(() => {
        if (count > 0) {
            setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        } else {
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }, [count]);

    return (
        <>
            <Head>
                <title>{ errMsg }</title>
            </Head>
            <Layout>
                <div id="errContainer">
                    <div className="err-content">
                        <div className="err-title">
                            <h1>Oops!</h1>
                        </div>
                        <h2>{ errMsg }</h2>
                        <p>{ msgContent }</p>
                        <a className="go-homepage-link" href="/">{ goHomepage }</a>
                    </div>
                </div>
                <style global jsx>{`
                * {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                }

                body {
                    padding: 0;
                    margin: 0;
                }

                #errContainer {
                    position: relative;
                    height: 100vh;
                }

                #errContainer .err-content {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }

                .err-content {
                    max-width: 410px;
                    width: 100%;
                    text-align: center;
                }

                .err-content .err-title {
                    height: 280px;
                    position: relative;
                    z-index: -1;
                }

                .err-content .err-title h1 {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 230px;
                    margin: 0px;
                    font-weight: 900;
                    position: absolute;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    -ms-transform: translateX(-50%);
                    transform: translateX(-50%);
                    background: url('${assetPrefix}/static/img/error-page-bg.jpg') no-repeat;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: cover;
                    background-position: center;
                }


                .err-content h2 {
                    font-family: 'Montserrat', sans-serif;
                    color: #000;
                    font-size: 24px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-top: 0;
                }

                .err-content p {
                    font-family: 'Montserrat', sans-serif;
                    color: #000;
                    font-size: 14px;
                    font-weight: 400;
                    margin-bottom: 20px;
                    margin-top: 0px;
                }

                .err-content a {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 14px;
                    text-decoration: none;
                    background: #0046d5;
                    display: inline-block;
                    padding: 15px 30px;
                    border-radius: 40px;
                    color: #fff;
                    font-weight: 700;
                    -webkit-box-shadow: 0px 4px 15px -5px #0046d5;
                    box-shadow: 0px 4px 15px -5px #0046d5;
                }


                @media only screen and (max-width: 767px) {
                    .err-content .err-title {
                        height: 142px;
                    }

                    .err-content .err-title h1 {
                        font-size: 112px;
                    }
                }
                `}</style>
            </Layout>
        </>
    );
};

Error.propTypes = {
    statusCode: PropTypes.number,
};
Error.getInitialProps = serverRes => {
    const { res, err } = serverRes;
    const statusCode = res ? res.statusCode : err ? err.statusCode : 0;

    return { statusCode };
};

export default Error;