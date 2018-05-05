'use strict';
const colors = require('colors');


function timeStamp() {
    return new Date();
}


function log(message) {
    console.log(`${timeStamp()}: ` + `${message}`);
}

function success(message) {
    console.log(`${timeStamp()}: ` + `${message}`.green);
}


function info(message) {
    console.info(`${timeStamp()}: ` + `${message}`.blue);
}


function warning(message) {
    console.log(`${timeStamp()}: ` + `${message}`.yellow);
}


function error(message) {
    console.error(`${timeStamp()}: ` + `${message}`.red);
}


module.exports = {
    log,
    success,
    info,
    warning,
    error,
};
