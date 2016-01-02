'use strict';

var Player = require('./models/player');


exports.createPlayer = function (req, res) {

	//console.log('body: ', req.body);
	//console.log('params: ', req.params);

	if (req.body == null || req.body.id == null) {
		console.log('creating new player');

		var player = new Player();

		Player.create(player, function (err, player) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}

			return res.status(200).send(player._id);
		});
	} else {
		console.log('check if player exists');

		Player.findByIdAndUpdate(req.body.id, {
			$set: {
				name: req.body.name,
				opponentId: req.body.opponentId
			}
		}, function (err, res) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			//if (!docs.length) {
			//	console.log('ID not found in DB');
			//	res.statusCode(404).send('No user with that ID was found');
			//} else {
			//	console.log('player found');
			//	var player = new Player();
			//
			//	if(req.body.name) {
			//		player.name = req.body.name;
			//	}
			//	if(req.body.opponentId) {
			//		player.opponentId = req.body.opponentId;
			//	}
			//}
		});
	}
};
