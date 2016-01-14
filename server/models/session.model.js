'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	player1: { type: mongoose.Schema.ObjectId, ref: 'player' },
	player2: { type: mongoose.Schema.ObjectId, ref: 'player' }
});

module.exports = mongoose.model('Session', schema);
