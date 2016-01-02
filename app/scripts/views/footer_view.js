define([
	'underscore',
	'marionette',
	'text!templates/footer.html'
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
