'use strict';

var Player = require('./../models/player.model.js');
var Session = require('./../models/session.model.js');

/**
 * creates a new player
 * @param req nothing
 * @param res playerId
 * @returns {playerId}
 */
exports.createPlayer = function (req, res) {
	var player = new Player();

	Player.create(player, function (err, player) {
		if (err) {
			return res.sendStatus(500);
		}
		var result = {
			id: player._id
		};
		return res.status(200).send(result);
	});
};

/**
 * connects to another player and creates a session
 * @param req playerId, opponentId
 * @param res sessionId
 * @returns {sessionId}
 */
exports.connect = function (req, res) {

	if (req.body == null || req.body.id == null) {
		return res.status(500).send('missing ID');
	}
	if (req.body == null || req.body.opponentId == null) {
		return res.status(500).send('missing opponentId');
	}
	var newName;
	if(req.body !== null) {
		if (req.body.name !== null && req.body.name.length > 0) {
			newName = req.body.name;
		} else {
			newName = 'player_' + req.body.id;
		}
	}

	Player.findById(req.body.opponentId, function (err, docs) {
		if (!docs) {
			return res.status(404).send('no such opponent');
		}

		Player.findByIdAndUpdate(req.body.id, {
			$set: {
				name: newName
			}
		}, function (err, docs) {
			if (!docs) {
				return res.status(404).send('no such ID');
			}

			var session = new Session();
			session.player1 = req.body.id;
			session.player2 = req.body.opponentId;

			Session.create(session, function (err, docs) {
				if (err) {
					return res.sendStatus(500);
				}

				var result = {
					sessionId: session._id
				};
				return res.status(200).send(result);
			});

		});
	});

};
