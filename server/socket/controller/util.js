var Player = require('../../models/player.model');

module.exports.getPlayerFromSocketId = function (data, callback) {
	Player.findOne({socketId: data}, function (err, player) {
		if (err) {
			console.log(err);
		}
		return callback(player);
	});
};

module.exports.updateSocketId = function (oldSocketId, socketId) {
	Player.findOne({socketId: oldSocketId}, function (err, player) {
		if (err) {
			console.log(err);
		}

		player.socketId = socketId;

		player.save(function (err) {
			if (err) return handleError(err);
		});
	});
};
