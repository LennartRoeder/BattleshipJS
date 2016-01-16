'use strict';

var init = require('./controller/init.controller');


module.exports.init = function (io) {
	var nsp = io.of('/init');

	nsp.on('connection', function (socket) {
		console.log('User ' + socket.id + ' connected!');

		init.createPlayer(socket, nsp);

		socket.on('createSession', function(data) {
			init.createSession(socket, data.opponentId);
		});

		socket.on('disconnect', function () {
			console.log('a user disconnected');
		});
	});
};

module.exports.game = function (server) {
	// TODO implement main game logic here
};
