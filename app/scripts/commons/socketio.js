define([
	'socketio'
], function (
	io
) {
	'use strict';
	var socket = io();
	return socket;
});
