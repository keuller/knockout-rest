/*
 Knockout-Rest 1.0.0 Copyright (c) 2010-2014,
 Available via the MIT or new BSD license.
 see: https://github.com/keuller/knockout-rest for details
*/
(function() {
	'use strict';

	if (ko === 'undefined') {
		throw new Error('Knockout.js is not present!');
	}

	ko.rest = {
		version: '1.0.0',
		isUndefined: function(obj) {
			return (typeof obj === 'undefined');
		},
		isFunction: function(obj) {
			return (typeof obj === 'function');
		},
		isObject: function(obj) {
			return (typeof obj === 'object');
		}
	};

	ko.rest.get = function(obj, prop) {
		var object = ko.utils.unwrapObservable(obj);
		return object[prop];
	};

	/**
	 * ex.: ko.rest.service('/api/contacts') 
	 */
	ko.rest.service = function(url) {

		var Rest = function(endpoint) {
			this.url = endpoint;
		};

		// GET 'url'
		Rest.prototype.query = function(params, _success, _error) {
			if (ko.rest.isUndefined(_error)) {
				_error = function(err) { console.log(err); };
			}

			var self = this;
			if (ko.rest.isUndefined(params) || ko.rest.isFunction(params)) {
			    _success = params;
				ko.rest.adapter({ method: 'GET', url: self.url, data: {}, success: _success, error: _error });
				return;
			}

			ko.rest.adapter({ method: 'GET', url: self.url, data: params, success: _success, error: _error });
		};

		// GET 'url'
		Rest.prototype.load = function(code, _success, _error) {
			if (ko.rest.isUndefined(_error)) {
				_error = function(err) { console.log(err); };
			}

			var self = this;
			var _url = self.url + '/' + code;
			ko.rest.adapter({ method: 'GET', url: _url, data: {}, success: _success, error: _error });
		};

		// POST 'url'
		Rest.prototype.save = function(_data, _success, _error) {
			if (ko.rest.isUndefined(_data) || ko.rest.isFunction(_data)) {
				throw new Error('Data object parameter is required.');
			}

			if (ko.rest.isUndefined(_error)) {
				_error = function(err) { console.log(err); };
			}

			var self = this;
			ko.rest.adapter({ method: 'POST', url: self.url, data: _data, success: _success, error: _error });
		};

		// PUT 'url'
		Rest.prototype.update = function(data, _success, _error) {
			if (ko.rest.isUndefined(data) || ko.rest.isFunction(data)) {
				throw new Error('Data object parameter cannot be found.');
			}

			if (ko.rest.isUndefined(_error)) {
				_error = function(err) { console.log(err); };
			}

			if (!data.hasOwnProperty('id')) {
				throw new Error("Object provided has no property 'id'.");
			}

			var _id = data.id;
			var _json = data;

			var _url = this.url + '/' + _id;
			ko.rest.adapter({ method: 'PUT', url: _url, data: _json, success: _success, error: _error });
		};

		// method DELETE 'url'
		Rest.prototype.delete = function(code, _success, _error) {
			if (ko.rest.isUndefined(_error)) {
				_error = function(err) { console.log(err); };
			}

			var self = this;

			if (ko.rest.isUndefined(code)) {
				throw new Error("'id' parameter was not specified.");
			} else {
				var _url = self.url + '/' + code;
				ko.rest.adapter({ method: 'DELETE', url: _url, data: {}, success: _success, error: _error });
			}
		};

		return new Rest(url);
	};

	// native adapter
	ko.rest.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch(e) {
		}
	};

    // pass an object { method, url, data, success, error }
	ko.rest.adapter = function(obj) {
	
		if (!ko.rest.isUndefined(jQuery)) {
			$.ajax({
				url: obj.url, 
				cache: false,
				data: obj.data,
				type: obj.method,
				dataType: 'json'
			}).done(obj.success)
			  .fail(obj.error);
			return;
		}

		var xhr = ko.rest.xhr();
		xhr.onload = function() {
			var res = JSON.parse(this.responseText);
			obj.success(res);
		};
		xhr.onerror = function() { 
			var res = JSON.parse(this.responseText);
			obj.error(res);
		};
		
		var qrystr = convert(obj.data);
		if (!ko.rest.isUndefined(qrystr) && qrystr !== '') {
			obj.url = obj.url + '?' + qrystr;
		}

		xhr.open(method, obj.url, true);

		if (obj.method === 'GET') {
			xhr.send(null);
		} else {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(obj.data));
		}
	};

	function convert(obj) {
		if (typeof obj === 'undefined') {
			return '';
		}

		var _tmp = '', idx = 0;
		for(var key in obj) {
			if (idx === 0) {
				_tmp += (key + '=' + obj[key]);
			} else {
				_tmp += '&' + (key + '=' + obj[key]);
			}
			idx++;
		}
		return _tmp;
	}

})();
