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

		initialize: function () {
			var self = this;

			io.on('test', function (data) {
				console.log(data);
			});

			this.model = new ConnectModel();
			this.playerModel = new PlayerModel();
			this.playerModel.save().
				done(function () {
					self.model.set('playerId', self.playerModel.get('id'));
				});
		},

		onClickConnect: function () {
			this.model.url = 'http://localhost:9000/api/connect';
			this.model.save();
		},

		onRender: function () {
			this.stickit();
		}
	});
});
