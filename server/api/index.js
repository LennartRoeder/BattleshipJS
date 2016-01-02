var baucis = require('baucis');

var normalizedPath = require("path").join(__dirname, "models");

// require all files from the models directory
require('fs').readdirSync(normalizedPath).forEach(function(file) {
	require("./models/" + file);
});


module.exports = {
	init: function () {
		createUserID();
	}
};

var createUserID = function () {
	baucis.rest({
		singular: 'userID'
	});
};
