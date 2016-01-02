define([
	'underscore',
	'marionette',
	'text!templates/main_layout.html',
	'views/header_view',
	'views/description_view',
	'views/content_view',
	'views/footer_view'
], function (_,
			 Marionette,
			 Template,
			 HeaderView,
			 DescriptionView,
			 ContentView,
			 FooterView) {
	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(Template),

		regions: {
			HeaderRegion: '.header',
			DescriptionRegion: '.description',
			ContentRegion: '.content',
			FooterRegion: '.footer'
		},

		onShow: function () {
			var self = this;
			this.model.save()
				.done(function (response) {
					console.log(response);
					self.showHeader();
					self.showDescription();
					self.showContent();
					self.showFooter();
				});
		},

		showHeader: function () {
			this.HeaderRegion.show(new HeaderView({
				model: this.model
			}));
		},

		showDescription: function () {
			this.DescriptionRegion.show(new DescriptionView({
				model: this.model
			}));
		},

		showContent: function () {
			this.ContentRegion.show(new ContentView({
				model: this.model
			}));
		},

		showFooter: function () {
			this.FooterRegion.show(new FooterView({
				model: this.model
			}));
		}
	});
});
