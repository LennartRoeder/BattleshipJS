define([
	'backbone'
], function (
	Backbone
) {
	'use strict';
	return Backbone.Model.extend({

		defaults: {
			'id': null,
			'name':''
		},

		url: 'http://localhost:9000/api/init'
	});
});
