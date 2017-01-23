(function () { 'use strict';}());

angular.module('miab').service('APIService',function($http, $q) {
	var APIService;

	var DUMMY_MODE = false;

	var Private = {
		ssl: APILOCATION.ssl,
		host: APILOCATION.host,
		port: APILOCATION.port,
		api_version: 'v1'
	};
	// Use this service to log in via API and store user credential information.
	APIService = {
		// Dummy
		getSSL : function(){
			return Private.ssl ? 'https://' : 'http://';
		},
		getBaseURL : function(){
			return APIService.getSSL() + Private.host + (Private.port === '80' ? '' : ':' +Private.port);
		},
		getAPIURL: function(v){
			if(DUMMY_MODE){
				return '';
			}
			else {
				//return APIService.getBaseURL() + '/api/' + (v ? v : Private.api_version);
				return APIService.getBaseURL();
			}
		},
		getPromiseDummy: function(method, url, data, returnKey){
			var deferred = $q.defer();
			deferred.resolve({
				method: method,
				url: url,
				data: data,
				returnKey: returnKey
			});
			return deferred.promise;
		},
		getPromise: function(method, url, data, returnKey){
			var deferred = $q.defer();
			var req = {
				method: method,
				url: DUMMY_MODE ? 'service/APIService/APIService-mock.json' : url
			};
			if(data) {
				req.data = data;
			}
			$http(req)
				.success(function(res){
					if(DUMMY_MODE){
						deferred.resolve(res.responses[url]);
					}
					else {
						if(returnKey) {
							deferred.resolve(res[returnKey]);
						}
						else {
							deferred.resolve(res);
						}
					}
				})
				.error(function(err){
					console.log(err);
					if(!err){
						deferred.reject({errors: 'Error: 500; most likely the server has thrown an exception. Try refreshing your window.'});
					}
					else {
						deferred.reject(err);
					}
				});
			return deferred.promise;
		}
	};

	return APIService;
});
