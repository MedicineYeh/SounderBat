var http = require("http");
var express = require("express");
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var publicPath = "./public";
var bodyParser = require('body-parser');

app.set('views', __dirname);
app.set('view engine', 'html');

//app.use(express.static(publicPath));
app.use(bodyParser());
app.use(express.static(publicPath));

app.get('/', function(request, response) {
	var filePath = './index.html';
    var stat = fs.statSync(filePath);

	response.writeHead(200, {'Content-Type':'text/html'});
    
    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
	readStream.pipe(response);
});

http.createServer(app).listen(3000);

console.log('Server is running...');
