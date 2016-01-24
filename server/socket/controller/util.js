var Player = require('../../models/player.model');
var Session = require('../../models/session.model');

module.exports.getPlayerFromSocketId = function (data, callback) {
	Player.findOne({socketId: data}, function (err, player) {
		if (err) {
			console.log(err);
		}
		return callback(player);
	});
};

module.exports.updateSocketId = function (player, sessionId) {
	player.socketId = player.socketId.replace('/init#', '/' + sessionId + '#');

	player.save(function (err) {
		if (err) return handleError(err);
	});
};

module.exports.getPlayerWithTurn = function (sessionId, callback) {
	Session.findById(sessionId)
		.populate('turn')
		.exec(function (err, session) {
			if (err) console.log(err);
			callback(session.turn.socketId);
		});
};

module.exports.areAllPlayersReady = function (sessionId, callback) {
	Session.findById(sessionId)
		.populate('player1 player2')
		.exec(function (err, session) {
			if (err) console.log(err);

			if (session.player1.shipsSet && session.player2.shipsSet) {
				return callback();
			}
		});
};

module.exports.deletePlayer = function(socketId) {
	Player.find({socketId: socketId}).remove().exec();
};
