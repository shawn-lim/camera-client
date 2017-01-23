/*jslint node: true */
(function () { 'use strict';}());

var gbUtils = require('../gb-utils-required.js');
var buildFolder = 'dist/';

module.exports = {
  production: {
    options: {
    },
    files: {
      'app.css': 'app.scss'
    }
  }
};
