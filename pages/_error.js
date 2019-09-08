import React, { useEffect } from 'react';

const Error = function(props) {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 5000);
    }, []);

    return (
        <p>
            {   props.statusCode ? `An error ${props.statusCode} occurred on server, ready to go home page in 5 seconds`
                : 'An error occurred on client, ready to go home page in 5 seconds'
            }
        </p>
    )
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return { statusCode }
};

export default Error;