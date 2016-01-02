define([
	'underscore',
	'marionette',
	'text!templates/header.html'
], function (
	_,
	Marionette,
	Template
) {
	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(Template)

	});
});
