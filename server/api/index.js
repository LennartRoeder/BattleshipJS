var express = require('express');
var controller = require('./api.controller');

var router = express.Router();


router.get('/getUserID', controller.getUserId);


module.exports = router;
