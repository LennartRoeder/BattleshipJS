'use strict';

var init = require('./controller/init.controller');
var game = require('./controller/game.controller');
var util = require('./controller/util');


module.exports.init = function (io) {
	var nsp = io.of('/init');

	nsp.on('connection', function (socket) {
		console.log('User ' + socket.id + ' connected!');

		init.createPlayer(socket, nsp);

		socket.on('createSession', function(data) {
			init.createSession(socket, nsp, data.opponentId, function (sessionId) {
				createGame(io, sessionId);
			});
		});

		socket.on('disconnect', function () {
			console.log('a player disconnected from /init');
			// TODO: delete user from DB
		});
	});
};

var createGame = function (io, sessionId) {
	var nsp = io.of('/' + sessionId);

	nsp.on('connection', function (socket) {
		console.log('Player ' + socket.id + ' connected! (' + socket.server.eio.clientsCount + ' players)');

		socket.emit('welcome', 'welcome to the game, please place your ships!');

		socket.on('updateSocketId', function (oldSocketId) {
			util.updateSocketId(oldSocketId, socket.id);
		});

		socket.on('setShips', function (ships) {
			game.setShips(socket, nsp, ships);
		});

		// TODO: implement game logic

		socket.on('disconnect', function () {
			console.log('a player disconnected from the game');
		});
	});
};
