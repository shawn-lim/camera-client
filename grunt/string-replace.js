/*jslint node: true */
(function () { 'use strict';}());

var gbUtils = require('../gb-utils-required.js');

module.exports = {
  main: {
    files: {
      'temp/app.full.js' : 'temp/app.full.js'
    },
    options: {
      replacements: [{
        pattern: /APILOCATION={(.*?)}/ig,
        replacement: "APILOCATION={host:location.hostname, port:'8090', ssl:false}"
      }]
    }
  },
  production: {
    files: {
      'temp/app.full.js' : 'temp/app.full.js'
    },
    options: {
      replacements: [{
        pattern: /APILOCATION={(.*?)}/ig,
        replacement: "APILOCATION={host:'opi.istuary.com', port:'80', ssl:true}"
      }]
    }
  }
};
