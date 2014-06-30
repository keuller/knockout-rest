(function($) {
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
				$.get(self.url)
				.done(params)
				.fail(success);
				return;
			}

			$.get(self.url, params)
			.done(success)
			.fail(error);
		};

		// GET 'url' with parameters
		Rest.prototype.load = function(code, success, error) {
			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;
			var _url = self.url + '/' + code;
			$.get(_url).done(success).fail(error);
		};

		// POST 'url'
		Rest.prototype.save = function(data, success, error) {
			if (ko.rest.isUndefined(data) || ko.rest.isFunction(data)) {
				throw new Error('Data object parameter is required to invoke this method.');
			}

			if (ko.rest.isUndefined(error)) {
				error = function(err) { console.log(err); };
			}

			var self = this;
			$.post(self.url, data)
			   .done(success)
			   .fail(error);
		};

		// PUT 'url'
		Rest.prototype.update = function(data, success, error) {
			if (ko.rest.isUndefined(data) || ko.rest.isFunction(data)) {
				throw new Error('Data object parameter is required to invoke this method.');
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
			$.ajax({
				url: _url, 
				cache: false,
				data: _json,
				type: 'PUT',
				dataType: 'json'
			}).done(success).fail(error);
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
				$.ajax({
					url: _url, 
					cache: false,
					type: 'DELETE',
					dataType: 'json'
				}).done(success).fail(error);
			}
		};

		return new Rest(url);
	};

})(jQuery);
