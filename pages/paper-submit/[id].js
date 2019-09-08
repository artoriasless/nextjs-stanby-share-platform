import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';

import {
    Layout,
} from 'components';

import 'jodit/build/jodit.min.css';

const Editor = function(props) {
    // https://xdsoft.net/jodit/
    dynamic(() => import('jodit'), {
        ssr: false
    });

    const JoditEditor = dynamic(() => import('jodit-react'), {
        ssr: false
    });
    const paperContent = 'title';
    const changeHandler = val => {
        console.info('change', val);
    };
    const editorConfig = {
        readonly: false,
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
        ]
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
};
const PaperEdit = withRouter(function(props) {
    const { query } = props.router || {};
    const {
        id = ''
    } = query || {};

    return (
        <>
            <Head>
                <title>Paper Edit Page { id }</title>
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