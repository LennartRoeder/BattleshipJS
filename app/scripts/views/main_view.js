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
], function (_,
			 $,
			 Backbone,
			 Marionette,
			 Template,
			 GameTemplate,
			 ConnectModel,
			 io) {
	'use strict';

	// TODO: this instantiation looks wrong, could you place it, were it belongs pls.
	var initSocket;

	return Marionette.ItemView.extend({

		template: _.template(Template),

		bindings: {
			'.id': {
				observe: 'playerId',
				onGet: function (value) {
					if (value) {
						return value.slice(6);
					}
				}
			},
			'.name': 'name',
			'.opponent': {
				observe: 'opponentId',
				onSet: function (value) {
					if (value) {
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

			initSocket = io('/init');

			initSocket.on('id', function (id) {
				self.model.set('playerId', id);
			});

			// listens for game connections
			initSocket.on('createSession', function (sessionId) {
				var gameSocket = io('/' + sessionId);

				console.log('sessionId:', sessionId);

				initSocket.disconnect();

				gameSocket.on('welcome', function (message) {
					console.log(message);

					var ships = [
						['A1', 'B1'],
						['C5', 'D5', 'E5']
					];
					gameSocket.emit('setShips', ships);
					console.log('ships set');

					gameSocket.on('turn', function (message) {
						console.log(message);

						var target = 'B1';
						console.log('shooting at', target);
						gameSocket.emit('shoot', target);
					});

					gameSocket.on('shoot', function (message) {
						console.log(message);
					});
				});

				gameSocket.on('playerLeft', function (message) {
					console.log(message);
				});

			});
		},

		// TODO: We need to send the name before this, otherwise the second player has no way to set a name
		// 1. connect to socket
		// 2. send name (this is part of the next step till now)
		// 3. start game or get picked by other player
		onClickConnect: function () {
			var id = this.model.get('playerId');
			var data = this.model.toJSON();

			// connect to game
			// TODO: Pls remove the playerID from data, it is not needed anymore.
			initSocket.emit('createSession', data);
		},

		onRender: function () {
			this.stickit();
		}
	});
});
