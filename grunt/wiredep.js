/*jslint node: true */
(function () { 'use strict';}());

var gbUtils = require('../gb-utils-required.js');
var buildFolder = 'dist/';

module.exports = {
  task: {
    // Point to the files that should be updated when
    // you run `grunt wiredep`
    src: [
      '*.html'   // .html support...
    ],
    options: {
			// See wiredep's configuration documentation for the options
			// you may pass:
			fileTypes: {
				html: {
					block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
					detect: {
						js: /<script.*src=['"](.+)['"]>/gi,
						css: /<link.*href=['"](.+)['"]/gi
					},
					replace: {
						js: '<script src="{{filePath}}"></script>',
						css: '<link rel="stylesheet" href="/{{filePath}}" />'
					}
				}
			}
		}
    // https://github.com/taptapship/wiredep#configuration
  },
	production: {
		// Point to the files that should be updated when
		// you run `grunt wiredep`
		src: [
			'*.html'   // .html support...
		],
		options: {
			// See wiredep's configuration documentation for the options
			// you may pass:
			fileTypes: {
				html: {
					block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
					detect: {
						js: /<script.*src=['"](.+)['"]>/gi,
						css: /<link.*href=['"](.+)['"]/gi
					},
					replace: {
						js: '<script src="{{filePath}}"></script>',
						css: '<link rel="stylesheet" href="{{filePath}}" />'
					}
				}
			}
		}
		// https://github.com/taptapship/wiredep#configuration
	}
};
