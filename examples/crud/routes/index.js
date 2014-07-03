var express = require('express');
var router = express.Router();

var cities = [
	{ "id": 1, "name": "Belem", "state": "PA"}, 
	{ "id": 2, "name": "Ananindeua", "state": "PA"}, 
 	{ "id": 3, "name": "Curitiba", "state": "PR"}, 
	{ "id": 4, "name": "Pinhais", "state": "PR"}, 
	{ "id": 5, "name": "Colombo", "state": "PR"}, 
	{ "id": 6, "name": "Sao Jose dos Pinhais", "state": "PR"}, 
	{ "id": 7, "name": "Campo Comprido", "state": "PR"}];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('cities', { });
});

router.get('/partials/title', function(req, res) {
	res.render('fragment', { title: 'Knockout-Rest Demo Application' });
});

/* returns a list of cities */
router.get('/api/cities', function(req, res) {
	var name = req.query.name;

	// checks if parameter name exists, if true, 
	// then return just record found
	if (name) {
		console.log(' Name..: ' + name);
		for(var idx=0; idx < cities.length; idx++) {
            var city = cities[idx];
			if (name === city.name) {
				res.json(city);
				return;
			}
		}
		
	}
	res.json(cities);
});

/* returns just a city with specified ID  */
router.get('/api/cities/:id', function(req, res) {
	var code = req.params.id;

	for(var idx=0; idx < cities.length; idx++) {
		if (cities[idx].id == code) {
			return res.json(cities[idx]);
		}
	}

	res.json({});
});

/* POST: save data - CREATE operation */
router.post('/api/cities', function(req, res) {
	console.log('----- [ POST ] ------ ');
	console.log('JSON: ' + JSON.stringify(req.body));
	console.log('--------------------- ');
	var msg = { code: 0, message: 'OK' };
	res.json(msg);
});

/* PUT: update data */
router.put('/api/cities/:id', function(req, res) {
	console.log('----- [ UPDATE ] ----- ');
	console.log('ID..: ' + req.params.id);
	console.log('JSON: ' + JSON.stringify(req.body));
	console.log('---------------------- ');
	var msg = { code: 0, message: 'OK' };
	res.json(msg);
});

/* DELETE */
router.delete('/api/cities/:id', function(req, res) {
	console.log('----- [ DELETE ] ----- ');
	console.log('ID..: ' + req.params.id);
	console.log('---------------------- ');
	var msg = { code: 0, message: 'OK' };
	res.json(msg);
});

module.exports = router;
