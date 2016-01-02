'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name : String,
	opponentId: String
});

module.exports = mongoose.model('Player', schema);
