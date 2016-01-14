'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	playersTurn: { type: mongoose.Schema.ObjectId, ref: 'player' },
	gameDone: Boolean
});

module.exports = mongoose.model('GameState', schema);
