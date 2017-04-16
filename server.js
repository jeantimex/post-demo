var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var filepath = 'cities.json';

function searchCity(cities, city) {
  if (!cities || !city) {
    return null;
  }

  for (var i = 0; i < cities.length; i++) {
    if (cities[i].city === city) {
      return cities[i];
    }
  }

  return null;
}

// routes will go here
app.get('/api/cities', function(req, res) {
  // read the JSON
  fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) throw err;
    var cities = JSON.parse(data);
    res.send(cities);
  });
});

app.post('/api/city', function(req, res) {
  var city = req.body.city;
  // read the JSON
  fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) throw err;
    var cities = JSON.parse(data);
    res.send(searchCity(cities, city));
  });
});

// start the server
app.listen(port);
console.log('Server started! http://localhost:' + port);
