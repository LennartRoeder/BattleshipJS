define([
	'underscore',
	'jquery',
	'marionette',
	'text!templates/content.html'
], function (
	_,
	$,
	Marionette,
	Template
) {
	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(Template),

		ui: {
			name: '.name'
		},

		onShow: function () {
			$(this.ui.name).focus();
		}
	});
});
