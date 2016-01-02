'use strict';

var express = require('express');
var controller = require('./api.controller');

var router = express.Router();


router.post('/player', controller.createPlayer);
router.post('/connect', controller.updatePlayer);


module.exports = router;
