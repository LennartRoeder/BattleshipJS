define([
	'underscore',
	'marionette',
	'text!templates/main_layout.html'
], function (
	_,
	Marionette,
	Template
) {
	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(Template),

		initialize: function () {
			console.log(this, 'Initialize Main Layout');
		}
	});
});
