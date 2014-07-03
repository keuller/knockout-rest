(function() {
	'use strict';

	if (ko === 'undefined') {
		throw new Error('Knockout.js is not present!');
	}

	ko.rest = {
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
		Rest.prototype.query = function(params, success, error) {
			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;
			if (ko.rest.isUndefined(params) || ko.rest.isFunction(params)) {
				ko.rest.adapter('GET', self.url, {}, params, success);
				return;
			}

			ko.rest.adapter('GET', self.url, params, success, error);
		};

		// GET 'url'
		Rest.prototype.load = function(code, success, error) {
			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;
			var _url = self.url + '/' + code;
			ko.rest.adapter('GET', _url, {}, success, error);
		};

		// POST 'url'
		Rest.prototype.save = function(data, success, error) {
			if (ko.rest.isUndefined(data) || ko.rest.isFunction(data)) {
				throw new Error('Data object parameter cannot be found.');
			}

			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;
			ko.rest.adapter('POST', self.url, data, success, error);
		};

		// PUT 'url'
		Rest.prototype.update = function(data, success, error) {
			if (ko.rest.isUndefined(data) || ko.rest.isFunction(data)) {
				throw new Error('Data object parameter cannot be found.');
			}

			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			if (!data.hasOwnProperty('id')) {
				throw new Error("Object provided has no property 'id'.");
			}

			var _id = data.id;
			var _json = data;

			var _url = this.url + '/' + _id;
			ko.rest.adapter('PUT', _url, _json, success, error);
		};

		// method DELETE 'url'
		Rest.prototype.delete = function(code, success, error) {
			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;

			if (ko.rest.isUndefined(code)) {
				throw new Error("'id' parameter was not specified.");
			} else {
				var _url = self.url + '/' + code;
				ko.rest.adapter('DELETE', _url, {}, success, error);
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

	ko.rest.adapter = function(method, _url, _data, cb_ok, cb_err) {
		if (!ko.rest.isUndefined(jQuery)) {
			$.ajax({
				url: _url, 
				cache: false,
				data: _data,
				type: method,
				dataType: 'json'
			}).done(cb_ok)
			  .fail(cb_err);
		} else {
			var xhr = ko.rest.xhr();
			xhr.onload = function() {
				var res = JSON.parse(this.responseText);
				cb_ok(res);
			};
			xhr.onerror = function() { 
				var res = JSON.parse(this.responseText);
				cb_err(res);
			};
			
			var qrystr = convert(_data);
			if (typeof qrystr !== 'undefined' && qrystr !== '') {
				_url = _url + '?' + qrystr;
			}

			xhr.open(method, _url, true);

			if (method === 'GET') {
				xhr.send(null);
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(_data));
			}
		}
	};

	function convert(obj) {
		if (typeof obj === 'undefined')
			return '';

		var _tmp = '', idx = 0;
		for(var key in obj) {
			if (idx == 0)
				_tmp += (key + '=' + obj[key]);
			else 
				_tmp += '&' + (key + '=' + obj[key]);
			idx++;
		}
		return _tmp;
	}

})();
