'use strict';

const os = require('os');

const forever = require('forever-monitor');

const config = require('./config');

let max = 1;        // affect the number of child process
let silent = false; // affect whether show the console result in child process
const args = [
    `NODE_ENV=${process.env.NODE_ENV}`,
];

if (!config.dev) {
    max = os.cpus().length;
    silent = true;
}

const child = new(forever.Monitor)('./web/server.js', {
    max,
    args,
    silent,
    env: {
        FORCE_COLOR: true,
    },
});

child.on('start', () => {
    console.info(`app has started,address: ${config.domain}`);
});

child.on('exit', () => {
    console.info(`app has exited after ${max} restart(s)`);
});

child.start();