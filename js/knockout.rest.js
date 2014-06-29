(function($) {
	'use strict';

	if (ko === 'undefined') {
		throw new Error('Knockout.js is not present!');
	}

	ko.rest = {};

	ko.rest.get = function(obj, prop) {
		var object = ko.utils.unwrapObservable(obj);
		return object[prop];
	};

	/**
	 * deve receber o endpoint do servico REST
	 * ex.: ko.rest.service('/api/contacts') 
	 */
	ko.rest.service = function(url) {

		var Rest = function(endpoint) {
			this.url = endpoint;
		};

		// GET 'url'
		Rest.prototype.query = function(params, success, error) {
			if (error === 'undefined') {
				error = function(err) { console.log(err); };
			}

			var self = this;
			if (params === 'undefined' || typeof params === 'function') {
				$.get(self.url)
				.done(params)
				.fail(success);
				return;
			}

			$.get(self.url, params)
			.done(success)
			.fail(error);
		};

		// GET 'url', passando parametros
		Rest.prototype.load = function(code, success, error) {
			if (error === 'undefined') {
				error = function(err) { console.log(err); };
			}

			var self = this;
			var _url = self.url + '/' + code;
			$.get(_url).done(success).fail(error);
		};

		// POST 'url', passando objeto
		Rest.prototype.save = function(data, success, error) {
			if (data === 'undefined' || typeof data === 'function') {
				throw new Error('Data object parameter cannot be found.');
			}

			if (error === 'undefined') {
				error = function(err) { console.log(err); };
			}

			var self = this;
			$.post(self.url, data)
			   .done(success)
			   .fail(error);
		};

		// PUT 'url', passando objeto
		Rest.prototype.update = function(data, success, error) {
			if (data === 'undefined' || typeof data === 'function') {
				throw new Error('Data object parameter cannot be found.');
			}

			if (error === 'undefined') {
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
			if (error === 'undefined') {
				error = function(err) { console.log(err); };
			}

			var self = this;

			if (code === 'undefined') {
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
