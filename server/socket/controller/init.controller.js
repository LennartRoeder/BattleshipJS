var Player = require('../../models/player.model');
var Session = require('../../models/session.model');

module.exports.createPlayer = function (socket, nsp) {
	var player = new Player({
		socketId: socket.id
	});

	Player.create(player, function (err, player) {
		if (err) {
			console.log(err);
			nsp.to(socket.id).emit('id', 'Error: 500');
		}
		nsp.to(socket.id).emit('id', socket.id);
	});
};

module.exports.createSession = function (socket, opponentId) {
	if (opponentId) {
		getPlayerFromSocketId(opponentId, function (opponent) {
			if (opponent) {
				console.log('specific Opponent found!');
				createSessionFromUsers(socket.id, opponent);
			} else {
				console.log('NO specific Opponent found!');
				getLongestWaitingOpponent(function (opponent) {
					if (player) {
						createSessionFromUsers(socket.id, opponent);
					} else {
						nsp.to(socket.id).emit('createSession', 'no Opponent found');
					}
				});
			}
		});
	} else {
		getLongestWaitingOpponent(function (opponent) {
			createSessionFromUsers(socket.id, opponent);
		});
	}
};


var getPlayerFromSocketId = function (data, callback) {
	Player.findOne({socketId: data}, function (err, opponent) {
		if (err) {
			console.log(err);
		}
		return callback(opponent);
	});
};

var getLongestWaitingOpponent = function (data, callback) {
	console.log('getLongestWaitingOpponent()');
	Player.findOne({}, {}, {sort: {'created_at': 1}}, function (err, player) {
		callback(player);
	});
	// TODO: make sure the longest waiting player is not the player who sent the request.
};

var createSessionFromUsers = function (currentUserId, player2) {
	getPlayerFromSocketId(currentUserId, function (player1) {

		var session = new Session({
			player1: player1,
			player2: player2,
			turn: player1
		});

		Session.create(session, function (err, session) {
			if (err) {
				console.log(err);
				nsp.to(socket.id).emit('createSession', 'session creation error!');
			}
			nsp.to(socket.id).emit('createSession', session._id);
			nsp.to(player2.socketId).emit('createSession', session._id);
		});
	});
};


