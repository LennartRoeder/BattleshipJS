var socketio = require('socket.io');

module.exports.listen = function (server) {
	var io = socketio.listen(server);

	var nsp = io.of('/init');
	nsp.on('connection', function (socket) {
		console.log('a user connected!');

		nsp.emit('id', socket.id);

		socket.on('disconnect', function () {
			console.log('user disconnected');
		});
	});

	return io;
};
