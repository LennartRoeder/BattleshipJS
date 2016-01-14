var socketio = require('socket.io');
var Player = require('../../models/player.model.js');

module.exports.listen = function (server) {
	var io = socketio.listen(server);
	var nsp = io.of('/init');

	nsp.on('connection', function (socket) {
		console.log('User ' + socket.id + ' connected!');

		var player = new Player();
		player.socketId = socket.id;

		Player.create(player, function (err, player) {
			if (err) {
				nsp.to(socket.id).emit('id', 'Error: 500');
			}
			nsp.to(socket.id).emit('id', socket.id);
		});

		socket.on('disconnect', function () {
			console.log('a user disconnected');
		});
	});

	nsp.on('connection', function (socket) {

	});

	return io;
};
