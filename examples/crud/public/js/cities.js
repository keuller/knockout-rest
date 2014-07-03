(function() {
	'use strict';

	var CityViewModel = function() {
		this.service = ko.rest.service('/api/cities');
		this.model = ko.observable({ id:0, nome: '', estado: '' });
		this.collection = ko.observableArray([]);
	};

	CityViewModel.prototype.clear = function() {
		this.model({ id:0, name: '', state: '' });
		this.collection([]);
	};

	CityViewModel.prototype.listAll = function() {
		var self = this;
		self.service.query(function(data) {
			self.collection(data);
		});
	};

	CityViewModel.prototype.filter = function() {
		var self = this;
		self.service.query({ name: 'Curitiba' }, function(data) {
			self.collection(data);
		});
	};

	CityViewModel.prototype.fetch = function() {
		var self = this;
		self.service.load(1, function(data) {
			self.model(data);
		});
	};

	CityViewModel.prototype.save = function() {
		var self = this;
		console.log( self.model() );
		self.service.save(self.model(), function(data) {
			console.log(data);
		});
	};

	CityViewModel.prototype.update = function() {
		var self = this;
		self.service.update(self.model(), function(data) {
			console.log(data);
		});
	};

	CityViewModel.prototype.remove = function() {
		var self = this;
		var code = ko.rest.get(self.model(), 'id');
		self.service.delete(code, function(data) {
			console.log(data);
		});
	};

	CityViewModel.prototype.cancel = function() {
		this.model({ id:0, name:'', state: '' });
		document.getElementById('fragment').innerHTML = '';
	};

	ko.applyBindings( new CityViewModel() );

})();