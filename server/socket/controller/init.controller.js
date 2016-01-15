var socketio = require('socket.io');
var Player = require('../../models/player.model.js');

module.exports.listen = function (server) {
	var io = socketio.listen(server);
	var nsp = io.of('/init');

	nsp.on('connection', function (socket) {
		console.log('User ' + socket.id + ' connected!');

		createPlayer(socket);

		socket.on('createSession', function (data) {
			if (data.opponentId) {
				getSpecificOpponent(data, function (opponent) {
					if (opponent) {
						console.log('specific Opponent found');
						//createSession(data, opponent);
					} else {
						console.log('NO specific Opponent found');
						getLongestWaitingOpponent(data);
					}
				});
			} else {
				getLongestWaitingOpponent(data);
			}
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

	var getSpecificOpponent = function (data, callback) {
		Player.findOne({SocketID: data.OpponentId}, function (err, opponent) {
			if (err) return handleError(err);
			callback(opponent);
		});
	};

	var getLongestWaitingOpponent = function (data, callback) {
		console.log('getLongestWaitingOpponent()');
		//if(!opponent) {
		//	nsp.to(data.senderId).emit('createSession', 'no Opponent found');
		//}
	};

	var createSession = function(playerA, playerB) {

	};

	return io;
};
