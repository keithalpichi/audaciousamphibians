var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var crypto = require('crypto');
var axios = require('axios');
var db = require('../mysql/index.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));

app.post('/login', function(req, res) {
  var username = req.body.username;
  var pw = req.body.password;

  db.query('SELECT * FROM users WHERE username = ?', [username], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // add salt to pw then hash
      var hash = crypto.createHmac('sha256', results[0].salt)
        .update(pw)
        .digest('hex');
      // check to see if hash === password from db
      if (hash === results[0].password) {
        res.status(201).send('success');
      } else {
        res.status(401).send('invalid credentials');
      }
    }
  });


});


app.get('/logout', function(req, res) {

});

// INSERT user and pw in db
app.post('/signup', function(req, res) {
  var username = req.body.username;
  var pw = req.body.password;
  var email = req.body.email;

  // query db to see if username exists
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (results[0]) {
        res.status(409).send('username or email taken');
      } else {
        // generate salt for user
        var salt = Math.floor(Math.random() * 10000).toString();
        // hash password+salt
        var hash = crypto.createHmac('sha256', salt)
          .update(pw)
          .digest('hex');
        // insert username, hashed pw, salt, email
        db.query('INSERT INTO users (username, password, salt, email) VALUES (?, ?, ?, ?)', [username, hash, salt, email], function(err, results, fields) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.send(201).send('added user');
            }
        });
      }
    }
  });
});


// app.get('/users/:user_id', function(req, res) {
// });

// return list of a user's trips
app.route('/users/:user_id/trips')

  .get(function(req, res) {
    var userId = req.params.user_id;

    // query database for trips where trips.user_id = userId

    db.query('SELECT * FROM trips WHERE user_id = ?', [userId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    });

  })

  .post(function(req, res) {
    var tripTitle = req.body.title;
    var tripStart = req.body.start_address;
    var tripEnd = req.body.end_address;
    var userId = req.params.user_id;

    db.query('INSERT INTO trips (title, start_address, end_address, user_id) VALUES (?, ?, ?, ?)', [tripTitle, tripStart, tripEnd, userId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.status(201).send('trip created');
      }
    });

  });

app.route('/users/:user_id/trips/:trip_id')
  // SELECT a specific trip
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
    var userId = req.params.user_id;
    var tripId = req.params.trip_id;


    db.query('SELECT * FROM trips WHERE user_id = ? AND id = ?', [userId, tripId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results[0]);
      }
    });

  })
  // INSERT a trip
  // .post(function(req, res) {
  // added to route above
  // })
  // UPDATE trip -> trips_places -> places
  // commented out because redundancy below
  // .put(function(req, res) {

  // })
  // DELETE a trip
  .delete(function(req, res) {
    var tripId = req.params.trip_id;

    db.query('DELETE FROM trips WHERE id = ?', [tripId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('trip deleted');
      }
    });

  });

// return all places for a specific trip
// note: edited route to include trip_id, removed bc redundancy below
// app.get('/users/:user_id/trips/:trip_id/places', function(req, res) {
// });

app.route('/users/:user_id/trips/:trip_id/places')
  // return all places for a specific trip
  .get(function(req, res) {
    var tripId = req.params.trip_id;

    db.query('SELECT places.* FROM places, trips_places WHERE trips_places.trip_id = ? AND trips_places.place_id = places.id', [tripId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    });

  })
  // INSERT place into a specific trip
  .post(function(req, res) {
    var tripId = req.params.trip_id;
    var placeName = req.body.name;
    var placeId = req.body.place_id; // this is the google places id we get from the API
    var lat = req.body.lat;
    var lng = req.body.lng;
    var imageId = req.body.image_id;


    db.query('SELECT * FROM places WHERE place_id = ?', [placeId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        // if no record of place in places table
        if (results.length === 0) {
          // insert place into places table
          db.query('INSERT INTO places (name, lat, lng, place_id, image_id) VALUES (?, ?, ?, ?, ?)', [placeName, lat, lng, placeId, imageId], function(err, results, fields) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              db.query('SELECT * FROM places WHERE place_id = ?', [placeId], function(err, results, fields) {
                var newPlaceId = results[0].id;
                db.query('INSERT INTO trips_places (trip_id, place_id) VALUES (?,?)', [tripId, newPlaceId], function(err, response, fields) {
                  res.status(201).send('place created and added to trip');
                });
              });
            }
          });
        } else {
          db.query('INSERT INTO trips_places (trip_id, place_id) VALUES (?,?)', [tripId, results[0].id], function(err, results, fields) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.status(201).send('added to trip');
            }
          });
        }
      }
    });

  });

  // DELETE a place from a trip
  app.delete('/users/:user_id/trips/:trip_id/places/:place_id', function(req, res) {
    var tripId = req.params.trip_id;
    var placeId = req.params.place_id;

    db.query('DELETE FROM trips_places WHERE trip_id = ? AND place_id = ?', [tripId, placeId], function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('deleted place from trip');
      }
    });
  });

  app.post('/places', function(req, res) {
    var radius = req.body.radius;
    var coords = req.body.coords;
    var type = req.body.type;

    axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: 'INSERT_API_KEY_HERE',
        location: coords,
        radius: radius,
        type: type
      }
    })
    .then(function (response) {
      //console.log('Successful!', response.data);
      res.status(201).send(response.data);
    })
    .catch(function (error) {
      console.error('Server Error', error);
    });
  });

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

var port = process.env.PORT || 3306
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
