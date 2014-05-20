
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , db = require('./routes/db')
  , user = require('./routes/user')
  , fs = require('fs')
  , publicPath = './public'
  , home = require('./routes/home')
  , contact = require('./routes/contact')
  , about = require('./routes/about')
  , game = require('./routes/game')
  , https = require('https')
  , path = require('path');

var options = {
  key : fs.readFileSync('key.pem') ,
  cert: fs.readFileSync('cert.pem')
};


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/db', db.query);
app.post('/home', home.home);
app.post('/about', about.about);
app.post('/contact', contact.contact);
app.post('/game',game.game);

https.createServer(options , app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

