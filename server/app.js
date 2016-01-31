'use strict';

var express = require('express');
var socketIO = require('socket.io');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var api = require('./api');
var socket = require('./socket');


// start mongoose
mongoose.connect('mongodb://localhost/battleship', function() {
	mongoose.connection.db.dropDatabase();
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	var app = express();
	var server = http.createServer(app);
	var io = socketIO.listen(server);
	socket.init(io);

	server.listen(9000, function () {
		var host = server.address().address;
		var port = server.address().port;

		app.set('view engine', 'handlebars');
		app.set('views', __dirname + '../app/scripts/views');

		console.log('Example app listening at http://%s:%s', host, port);
	});

	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
	app.get('/', function(req, res){
	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
	});

	// support JSON
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	//app.use('/api', api);
});


