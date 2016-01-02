define([
	'marionette',
	'views/main_layout'
], function (
	Marionette,
	MainView
) {
	'use strict';

	var App = new Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		mainRegion: '.main'
	});

	App.addInitializer(function(){
		App.mainRegion.show(new MainView());
	});

	return App;
});
