var Ship = require('../../models/ship.model');
var Session = require('../../models/session.model');
var Player = require('../../models/player.model');
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

			ship.save(function (err) {
				if (err) return handleError(err);
			});

			ships.push(ship);
		});

		player.ships = ships;
		player.shipsSet = true;

		player.save(function (err) {
			if (err) return handleError(err);

			return callback();
		});

	});
};

module.exports.shoot = function (sessionId, socketId, target, callback) {
	isPlayersTurn(sessionId, socketId, function (turn) {
		if (!turn) {
			return callback('Not your turn!');
		}

		getOpponentShips(sessionId, socketId, function (ships) {
			if(!ships) {
				return callback(null);
			}
			var hit = 'miss';
			ships.forEach(function (ship) {
				ship.pieces.forEach(function (piece) {
					if (piece.coordinate === target) {
						hit = 'hit';
						piece.hit = true;
						ship.save(function (err) {
							if (err) return handleError(err);
						});
					}
				})

			});
			return callback(hit);
		});
	});
};

var isPlayersTurn = function (sessionId, socketId, callback) {
	util.getPlayerFromSocketId(socketId, function (player) {
		util.getPlayerWithTurn(sessionId, function (currentPlayer) {
			// Mongoose uses the mongodb-native driver, which uses the custom ObjectID type.
			// This is why == always returns false. Equals() works
			if (player._id.equals(currentPlayer._id)) {
				return callback(true);
			} else {
				return callback(false);
			}
		});
	});
};

var getOpponentShips = function (sessionId, socketId, callback) {
	Session.findById(sessionId)
		.populate('player1 player2')
		.exec(function (err, session) {
			if (err) console.log(err);
			if(!session.player1 || !session.player2) {
				return callback(null);
			}
			if (session.player1.socketId !== socketId) {
				getShipsFromSocketId(session.player1.socketId, function (ships) {
					return callback(ships);
				});
			} else {
				getShipsFromSocketId(session.player2.socketId, function (ships) {
					return callback(ships);
				});
			}
		});
};

var getShipsFromSocketId = function (socketId, callback) {
	Player.findOne({socketId: socketId})
		.populate('ships')
		.exec(function (err, player) {
			if (err) console.log(err);
			return callback(player.ships);
		});
};

module.exports.changeTurn = function (sessionId, socketId, callback) {
	Session.findById(sessionId)
		.populate('player1 player2 turn')
		.exec(function (err, session) {
			if (err) console.log(err);

			if (session.turn.equals(session.player1)) {
				session.turn = session.player2;
			} else {
				session.turn = session.player1;
			}

			session.save(function (err) {
				if (err) return handleError(err);
				return callback(session.turn.socketId);
			});
		});
};
