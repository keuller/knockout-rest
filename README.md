knockout-rest
=============

Knockout REST API provides a simple and flexibe API to use REST services with Knockout ViewModel objects.

## Getting Started

If you are new developer with KnockoutJS, please take a look [tutorials website](http://knockoutjs.com/documentation/introduction.html)

## Download JS libs

  1. KnockoutJS
  2. Knockout-rest

## Referencing Libraries

After you download the dependencies files, you just need to reference in HTML file like that:

	<script type='text/javascript' src='js/vendor/knockout-3.1.0.js'></script>
	<script type='text/javascript' src='js/vendor/knockout-rest.min.js'></script>

Note: As a good practice, put these `script` tags references on the bottom HTML page.

## Creating a ViewModel

Now, let us create our ViewModel object to interacte with server code. In this example, we're assuming that exist a REST services with CRUD operations.

	(function() {
	    'use strict';

	    var CityViewModel = function() {
	        this.service = ko.rest.service('/api/cities');
	        this.model = ko.observable({ id:0, name: '' });
	        this.collection = ko.observableArray([]);
	    };

	    ko.applyBindings(new CityViewModel());
	});

This code above, creates a view model called `CityViewModel` with 3 properties:

  1. **service**: it's a reference of our REST service, that point out to `/api/cities`;
  2. **model**: it's a observable reference to an POJO object;
  3. **collection**: it's a reference to model collection of cities;

At the end we applying this view model object into the page, using `ko.applyBindings` function. So simple, ha?!

## Defining REST service

`knockout-rest` provides a simple way to connect to the server using Ajax calls. To define a REST service in view model is so simple, by adding this line in your code:

	var service = ko.rest.service(['endpoint_url']);

After invocation this method, it will return an instance of REST service object provided by `knockout-rest`. This object provide to us a few methods that allow us make requests to the service, with no bother us with implementation details of Ajax's API. 

## Setting server side

In the server side we expect the follows endpoint convention:

  1. GET  /api/cities     : will return a list of cities;
  2. GET  /api/cities/:id : will return an instance of a city with `:id`;
  3. POST /api/cities     : create an instance of city, that will be passed in body request as JSON;
  4. PUT  /api/cities/:id : update an instance of city, that will be passed in body request as JSON;
  5. DELETE /api/cities/:id : will delete an instance of city with `:id` specified;

If you take a look these are endpoints to CRUD operations, but you can use knockout-rest as you wish. Now let's define each operation in our view model object. These endpoint are convention assumed by `knockout-rest` API.

## Default operations available

  1. Querying a collection of cities

     To query a list of cities, we just need to invoke `query` method from our `service` instance. You need to pass a callback function to `query` method like that:

		CityViewModel.prototype.list = function() {
		    var self = this;
		    self.service.query(function(data) {
		        self.collection(data);
		    });
		};

     In this example, server will return a JSON list of cities and we pass to `collection` property.

  2. Getting a single instance of city

     To get an instance of a single object, we need to invoke `get` method from our `service` instance.

		CityViewModel.prototype.find = function(code) {
		    var self = this;
		    self.service.load(code, function(data) {
		        self.model(data);
		    });
		};

     In this example, we will get a single instance of city with value of `code` parameter, the JSON result that come back from the server will be assigned to `model` property.

  3. Saving data to the server

     To send data to the server is so simple. Just pass you JSON data to `save` method like that:

		CityViewModel.prototype.save = function() {
		    var self = this;
		    var data = self.model();
		    self.service.save(data, function(result) {
		        console.log(result);
		    });
		};

  4. Updating data to the server

     To update an instance, like a `save` method you pass your JSON to `update` method like that:

		CityViewModel.prototype.update = function() {
		    var self = this;
	            var data = self.model();
		    self.service.update(data, function(result) {
		        console.log(result);
		    });
		};

     **Note**: to performe update operation, you model object must be an `id` property, otherwise knockout-rest will throw an error.

  5. Deleting a resource

     To remove an instance, inform the `id` value to `delete` method like that:

		CityViewModel.prototype.remove = function() {
		    var self = this;
		    var code = ko.rest.get(self.model(), 'id');
		    self.service.delete(code, function(result) {
		        console.log(result);
		    });
		};

     In this example above, we're using a helper method `ko.rest.get` to get the **id** value of our model object and pass it to `delete` method.


Roadmap
---

Please feel free to suggest new features and contribute with this project.

License
---

MIT License - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
