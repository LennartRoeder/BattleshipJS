'use strict';

var init = require('./controller/init.controller');


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
			console.log('a user disconnected');
		});
	});
};

var createGame = function (io, sessionId) {
	var nsp = io.of('/' + sessionId);

	nsp.on('connection', function (socket) {
		console.log('Player ' + socket.id + ' connected!');

		socket.emit('welcome', 'welcome to the game!');

		// TODO: implement game logic

		socket.on('disconnect', function () {
			console.log('a player disconnected from the game');
		});
	});
};
