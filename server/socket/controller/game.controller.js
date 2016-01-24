var Ship = require('../../models/ship.model');
var util = require('./util');

module.exports.setShips = function (socket, nsp, rawShips, callback) {
	// TODO: validate ship data
	util.getPlayerFromSocketId(socket.id, function (player) {
		var ships = [];

		rawShips.forEach(function (coordinates) {
			var ship = new Ship({
				size: coordinates.length,
				pieces: []
			});

			coordinates.forEach(function (coordinate) {
				ship.pieces.push({
					coordinate: coordinate,
					hit: false
				});
			});

			ships.push(ship);
		});

		player.ships = ships;
		player.shipsSet = true;

		player.save(function (err) {
			if (err) return handleError(err);

			callback();
		});

	});
};

module.exports.shoot = function (target, callback) {
	// TODO: check if it really is the players turn

	console.log('The target is:', target);
};


