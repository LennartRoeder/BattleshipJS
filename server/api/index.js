'use strict';

var express = require('express');
var player = require('./controller/player.controller.js');
var game = require('./controller/game.controller.js');

var router = express.Router();


router.post('/player', player.createPlayer);
router.post('/connect', player.connect);

router.post('/shoot', game.shoot);


module.exports = router;
