define([
	'underscore',
	'jquery',
	'backbone',
	'marionette',
	'text!templates/main_view.html',
	'text!templates/game_view.html',
	'models/connect_model',
	'models/main_model',
	'commons/socketio',
	'bbstickit'
], function (
	_,
	$,
	Backbone,
	Marionette,
	Template,
	GameTemplate,
	ConnectModel,
	PlayerModel,
	io
) {
	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(Template),

		bindings: {
			'.id': 'playerId',
			'.name': 'name',
			'.opponent': 'opponentId'
		},

		events: {
			'click .connect': 'onClickConnect'
		},

		model: new ConnectModel(),

		initialize: function () {
			var self = this;

			io.on('id', function (id) {
				console.log(id);
				self.model.set('playerId', id);
			});
		},

		onClickConnect: function () {
			var id = this.model.get('playerId');
			var data = this.model.toJSON();

			io.emit(id, data);
		},

		onRender: function () {
			this.stickit();
		}
	});
});
