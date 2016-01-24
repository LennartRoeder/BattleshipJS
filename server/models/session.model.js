'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	player1: { type: mongoose.Schema.ObjectId, ref: 'Player' },
	player2: { type: mongoose.Schema.ObjectId, ref: 'Player' },
	turn: { type: mongoose.Schema.ObjectId, ref: 'Player' }
});

module.exports = mongoose.model('Session', schema);
