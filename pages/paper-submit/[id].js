import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';

import config from 'config';
import {
    Layout,
} from 'components';

const Editor = function(props) {
    // https://xdsoft.net/jodit/
    const JoditEditor = dynamic(() => import('jodit-react'), {
        ssr: false
    });

    if (typeof window === 'undefined') {
        return null;
    } else {
        const paperContent = 'title';
        const changeHandler = val => {
            console.info('change', val);
        };
        const editorConfig = {
            readonly: false,
            controls: {
                font: {
                    list: {
                        'brush script mt': 'Brush Script MT',
                        'consola': 'Consolas',
                        'microsoft yahei': 'MicroSoft Yahei',
                        'snell roundhand script': 'Snell Roundhand Script',
                    },
                },
            },
            buttons: [
                'font', 'fontsize', 'brush', 'paragraph', 'align',
                '|',
                'bold', 'strikethrough', 'underline', 'italic',
                '|',
                'superscript', 'subscript',
                '|',
                'ul', 'ol',
                '|',
                'outdent', 'indent',
                '|',
                'undo', 'redo',
                '\n',
                'hr',
                'eraser',
                'copyformat',
                '|',
                'symbol',
                'fullsize',
                '|',
                'image', 'file', 'video', 'table', 'link',
                '|',
            ],
            extraButtons: [
                {
                    name: 'upload',
                    icon: 'upload',
                    exec: function (editor) {
                        console.info('upload');
                    }
                },
                {
                    name: 'save',
                    icon: 'save',
                    exec: function (editor) {
                        console.info('save');
                    }
                },
            ],
        };
        const $editorRef = typeof window === 'undefined' ? null : window.jodit;

        return (
            <JoditEditor
                editorRef={ $editorRef }
                value={ paperContent }
                config={ editorConfig }
                onChange={ changeHandler }
            />
        );
    }
};
const PaperEdit = withRouter(function(props) {
    const assetPrefix = config.dev ? '' : config.ossPublic.assetPrefix;
    const { query } = props.router || {};
    const {
        id = ''
    } = query || {};

    useEffect(() => {
        const intervalTask = setInterval(() => {
            if (typeof window !== 'undefined' && window.jodit) {
                clearInterval(intervalTask);
            }
        }, 100);

        setTimeout(() => {
            clearInterval(intervalTask);
        }, 10000);
    }, []);

    return (
        <>
            <Head>
                <title>Paper Edit Page { id }</title>
                <link rel="stylesheet" href={ `${assetPrefix}/static/plugins/jodit/index.css` }/>
                <script src={ `${assetPrefix}/static/plugins/jodit/index.js` }></script>
            </Head>
            <Layout>
                <h1>Paper Edit Page</h1>
                <div>
                    <h2>paper id : { id }</h2>
                    <div style={{ margin: '20px 100px' }}>
                        <Editor/>
                    </div>
                </div>
            </Layout>
        </>
    );
});

export default PaperEdit;