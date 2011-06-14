
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Dummy users database model
function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Hey Jade!'
  });
});

app.get('/users', function(req, res){
  res.render('users', {
    title: 'Hey Jade! - Users',
    users: users
  });
});

app.get('/users/list', function(req, res){
  res.partial('users/list', {
    title: 'Hey Jade! - Users',
    list: users
  });
});

app.get('/user/:id', function(req, res){
  res.partial('users/user', users[req.params.id]);
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
