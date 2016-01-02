define([
	'marionette',
	'views/main_layout',
	'models/main_model'
], function (
	Marionette,
	MainView,
	MainModel
) {
	'use strict';

	var App = new Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		mainRegion: '.main'
	});

	App.addInitializer(function(){
		App.mainRegion.show(new MainView({
			model: new MainModel()
		}));
	});

	return App;
});
