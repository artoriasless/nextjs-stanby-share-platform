import React from 'react';
import PropTypes from 'prop-types';

import 'style/app.scss';

const Layout = function(props) {
    const children = props.children || null;

    return (
        <div id="root">
            { children }
        </div>
    );
};

Layout.propTypes = {
    seo: PropTypes.object,
    children: PropTypes.array,
};

export default Layout;