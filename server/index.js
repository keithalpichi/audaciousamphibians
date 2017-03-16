var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: point to build file
// app.use(express.static(__dirname + '/../index.html'));
app.use(express.static(__dirname + '/../build'));


// routes

app.post('/login', function(req, res) {

});

app.get('/logout', function(req, res) {

});

app.post('/signup', function(req, res) {

});

app.get('/users/:user_id', function(req, res) {

});

app.get('/users/:user_id/trips', function(req, res) {

});

app.route('/users/:user_id/trips/:trip_id')
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
    console.log(req.params.user_id);
    res.send('GET-----/users/:user_id/trips/:trip_id');
  })
  .post(function(req, res) {

  })
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

app.get('/users/:user_id/places', function(req, res) {

});

app.route('/users/:user_id/places/:trip_id')
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
  })
  .post(function(req, res) {

  })
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
