var Player = require('../../models/player.model');
var Session = require('../../models/session.model');
var util = require('./util');

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

module.exports.createSession = function (socket, nsp, opponentId, callback) {
	if (opponentId) {
		util.getPlayerFromSocketId(opponentId, function (opponent) {
			if (opponent) {
				createSessionFromUsers(nsp, socket.id, opponent, function (sessionId) {
					return callback(sessionId);
				});
			} else {
				getLongestWaitingPlayer(socket, function (player) {
					if (player) {
						createSessionFromUsers(nsp, socket.id, player, function (sessionId) {
							return callback(sessionId);
						});
					} else {
						nsp.to(socket.id).emit('createSession', 'no Opponent found');
					}
				});
			}
		});
	} else {
		getLongestWaitingPlayer(socket, function (player) {
			createSessionFromUsers(nsp, socket.id, player, function (sessionId) {
				return callback(sessionId);
			});
		});
	}
};

var getLongestWaitingPlayer = function (socket, callback) {
	Player.findOne({'socketId': {$ne: socket.id}}, {}, {sort: {'created_at': 1}}, function (err, player) {
		return callback(player);
	});
};

var createSessionFromUsers = function (nsp, currentUserId, player2, callback) {
	util.getPlayerFromSocketId(currentUserId, function (player1) {

		var session = new Session({
			player1: player1,
			player2: player2,
			turn: player1
		});

		Session.create(session, function (err, session) {
			if (err) {
				console.log(err);
				nsp.to(player1.socketId).emit('createSession', 'session creation error!');
			}
			nsp.to(player1.socketId).emit('createSession', session._id);
			nsp.to(player2.socketId).emit('createSession', session._id);

			util.updateSocketId(player1, session._id);
			util.updateSocketId(player2, session._id);

			return callback(session._id);
		});
	});
};
