'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name : String,
	socketId: String,
	ships: [{ type: mongoose.Schema.ObjectId, ref: 'Ship' }],
	shipsSet: Boolean

});

module.exports = mongoose.model('Player', schema);
