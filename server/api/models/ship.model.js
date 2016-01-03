'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	coordinates: [{
		x: Number,
		y: Number
	}]
});

module.exports = mongoose.model('Ship', schema);
