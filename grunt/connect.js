/*jslint node: true */

var gbUtils = require('../gb-utils-required.js');
var rewrite = require('connect-modrewrite');
var pjson = require('../package.json');

module.exports = {
  main: {
    options: {
      hostname: "0.0.0.0",
      port: 5001,
			middleware: function(connect, options, middlewares) {
				// 1. mod-rewrite behavior
				var rules = [
					'!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.woff|\\.ttf\\.gif$ /index.html'
				];
        middlewares.unshift(function(req,res,next){
          if(req.originalUrl.indexOf('/client_version') === 0){
            res.end(pjson.version);
          }
          else {
            return next();
          }
        });
				middlewares.unshift(rewrite(rules));
				return middlewares;
			}
    }
  }
};
