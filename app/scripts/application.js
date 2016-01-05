define([
	'marionette',
	'views/main_view'
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
		var mainView = new MainView();
		App.mainRegion.show(mainView);
	});

	return App;
});
