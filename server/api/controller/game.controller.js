'use strict';

var GameState = require('./../models/gameState.model.js');
var Ship = require('./../models/ship.model.js');

/**
 *
 * @param req playerId, sessionId, target
 * @param res "hit, miss or sunk"
 * @returns {String}
 */
exports.shoot = function (req, res) {
	//console.log('shooting at: ', req.body.target);
	console.log('shooting');

	res.send('success');

};

