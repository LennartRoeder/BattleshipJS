'use strict';

var Player = require('./models/player.model');


exports.createPlayer = function (req, res) {
	var player = new Player();

	if (req.body && req.body.name) {
		player.name = req.body.name;
	}

	Player.create(player, function (err, player) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var result = {
			id: player._id,
			name: player.name
		};
		return res.status(200).send(result);
	});
};

exports.updatePlayer = function (req, res) {

	console.log(req.body);

	if (req.body == null || req.body.id == null) {
		return res.status(500).send('missing ID');
	}
	if (req.body == null || req.body.opponentId == null) {
		return res.status(500).send('missing opponentId');
	}

	Player.findById(req.body.opponentId, function (err, user) {
		if (!user) {
			return res.status(404).send('no such opponent');
		}

		Player.findByIdAndUpdate(req.body.id, {
			$set: {
				opponentId: req.body.opponentId
			}
		}, function (err, result) {
			if (err) {
				console.log(err);
				return res.status(404).send('no such ID');
			}
			return res.sendStatus(200);
		});
	});

};
