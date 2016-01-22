'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	size: Number,
	pieces: [{
		coordinate: String, // A1 to J10
		hit: Boolean
	}]
});

module.exports = mongoose.model('Ship', schema);



