knockout-rest
=============

Knockout REST API provides a simple and flexibe API to use REST services with Knockout ViewModel objects.

Dependencies
---

This API depends on [JQuery](http://jquery.com).

Getting Started
---

If you are new developer with KnockoutJS, please take a look [tutorials website](http://knockoutjs.com/documentation/introduction.html)

##Download all JS libs that you need

  1. JQuery
  2. KnockoutJS
  3. Knockout-rest

##Referening those libs on HTML file

After you download the dependencies files, you just need to reference in HTML file like that:

	<script type='text/javascript' src='js/vendor/jquery-2.1.1.min.js'></script>
	<script type='text/javascript' src='js/vendor/knockout-3.1.0.js'></script>
	<script type='text/javascript' src='js/vendor/knockout-rest.min.js'></script>

Note: As a good practice, put these `script` tag references on the bottom HTML page.

##Creating a ViewModel

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

##Defining REST service

In the server side we expect the follows endpoint convention:

  1. GET  /api/cities     : will return a list of cities;
  2. GET  /api/cities/:id : will return an instance of a city with `:id`;
  3. POST /api/cities     : create an instance of city, that will be passed in body request as JSON;
  4. PUT  /api/cities/:id : update an instance of city, that will be passed in body request as JSON;
  5. DELETE /api/cities/:id : will delete an instance of city with `:id` specified;

If you take a look these are endpoints to CRUD operations, but you can use knockout-rest as you wish. Now let's define each operation in our view model object.

##Default operations avaiable

TO-DO

##Defining server side REST endpoints

TO-DO

License
---

MIT License - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
