/*jslint node: true */
(function () { 'use strict';}());

var gbUtils = require('../gb-utils-required.js');
var buildFolder = 'dist/';

module.exports = {
  options: {
    files: ['package.json', 'grunt/server/package.json'],
    commitFiles: ['package.json', 'grunt/server/package.json'],
    pushTo: 'origin'
  }
};
