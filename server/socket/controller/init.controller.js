var socketio = require('socket.io');
var Player = require('../../models/player.model.js');

module.exports.listen = function (server) {
	var io = socketio.listen(server);
	var nsp = io.of('/init');

	nsp.on('connection', function (socket) {
		console.log('User ' + socket.id + ' connected!');

		createPlayer(socket);

		socket.on('createSession', function (data) {
			createSession(data);
		});

		socket.on('disconnect', function () {
			console.log('a user disconnected');
		});
	});


	var createPlayer = function (socket) {
		var player = new Player();
		player.socketId = socket.id;

		Player.create(player, function (err, player) {
			if (err) {
				nsp.to(socket.id).emit('id', 'Error: 500');
			}
			nsp.to(socket.id).emit('id', socket.id);
		});
	};

	var createSession = function (data) {
		console.log('data: ', data);

		if (data.opponentId && data.opponentId.length > 0) {
			console.log('looking for opponent!');
			// check if oponent exists
			Player.find({socketId: data.opponentId}, function (err, opponent) {
				if(err) {
					console.log(err);
				}

				console.log('opponent:', opponent);
			});
		}

		//var interval = setInterval(function () {
		//	// get player waiting for the longest time
		//	Player.findOne(new Player(), {}, {sort: {'created_at': 1}}, function (err, post) {
		//		opponent = post;
		//	});
		//	if (opponent) {
		//		clearInterval(interval);
		//	}
		//}, 1000);



		// create session with opponent

		// send sessionId to both opponents
	};

	return io;
};
