'use strict';

const fs = require('fs');
const path = require('path');
const Buffer = require('buffer').Buffer;
const readline = require('readline');
const co = require('co');
const OSS = require('ali-oss');
const CleanCss = require('clean-css');
const cssCompress = new CleanCss();

const config = require('./config');
const assetFolder = config.ossPublic.assetFolder;
const ossOpts = config.ossOpts;

const rootUrl = process.cwd();
const color = {
    info: '\x1b[33m',
    title: '\x1b[35m',
    text: '\x1b[36m',
    error: '\x1b[31m',
    reset: '\x1b[0m',
};
const print = function() {
    if (arguments) {
        console.info(...arguments);
    }
};
const userConfirm = function(info) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(info, answer => {
        rl.close();
        resolve(answer);
    }));
};
const uploadHandle = async function(localDir, originDir) {
    const getFilePathArr = folder => {
        const buildPath = path.resolve(rootUrl, folder);
        const filePathArr = [];
        let dirPathArr = [buildPath];
        let tmpDirPathArr = [buildPath];

        while(dirPathArr.length) {
            dirPathArr = [];

            for (let i = 0; i < tmpDirPathArr.length; i++) {
                const files = fs.readdirSync(tmpDirPathArr[i]);

                files.forEach(file => {
                    let filePath = path.resolve(tmpDirPathArr[i], file);

                    if (fs.lstatSync(filePath).isDirectory()) {
                        dirPathArr.push(filePath);
                    } else {
                        filePathArr.push(filePath);
                    }
                });
            }

            tmpDirPathArr = dirPathArr.slice(0);
        }

        return filePathArr;
    };
    const uploadFile = async (name, data) => {
        const client = new OSS(ossOpts);

        return new Promise((resolve, reject) => {
            co(function*() {
                client.useBucket(ossOpts.bucket);

                resolve(yield client.put(name, data));
            }).catch(function(error) {
                print();
                print(color.error, err, color.reset);
                reject(error);
            });
        });
    };
    const filePathArr = getFilePathArr(localDir);
    const ignorePrefix = path.resolve(process.cwd(), localDir);
    const cssReg = /\.css$/;

    print();
    print(color.title, `begin to upload static resources in dir 【${localDir}】 into OSS, the count of all files is ${filePathArr.length}...`, color.reset);

    filePathArr.forEach(async filePath => {
        const fileName = filePath.replace(ignorePrefix, originDir);
        let fileData = fs.readFileSync(filePath);
        let compressObj;

        try {
            if (cssReg.test(filePath)) {
                compressObj = cssCompress.minify(fileData.toString());
                fileData = new Buffer(compressObj.styles, 'UTF-8');
            }

            await uploadFile(fileName, fileData);
        } catch(err) {
            print();
            print(color.error, err, color.reset);
        }
    });
};
const ossPublish = async function() {
    const answer = await userConfirm(`${color.info}Are you sure to publish static resources into OSS?(y/N) ${color.reset}`);

    if (answer !== 'y') {
        print();
    } else {
        await uploadHandle('static', `${assetFolder}/static`);
        await uploadHandle('.next/static', `${assetFolder}/_next/static`);

        print();
        print(color.title, 'publishment is handling...', color.reset);
        print();
    }
};

(async function() {
    await ossPublish();
})();