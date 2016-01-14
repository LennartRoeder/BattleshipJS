define([
	'underscore',
	'jquery',
	'backbone',
	'marionette',
	'text!templates/main_view.html',
	'text!templates/game_view.html',
	'models/connect_model',
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
	io
) {
	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(Template),

		bindings: {
			'.id': {
				observe: 'playerId',
				onGet: function (value) {
					if(value){
						return value.slice(6);
					}
				}
			},
			'.name': 'name',
			'.opponent': {
				observe: 'opponentId',
				onSet: function (value) {
					if(value){
						return '/init#' + value;
					}
				}
			}
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
