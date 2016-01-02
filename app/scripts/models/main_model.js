define([
	'backbone'
], function (
	Backbone
) {
	'use strict';
	return Backbone.Model.extend({
		_defaults: {
			id: null,
			name:'',
			coordinate: null
		},

		url: ' http://localhost:9000/api/player'
	});
});
