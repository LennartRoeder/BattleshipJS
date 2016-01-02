var normalizedPath = require("path").join(__dirname, "models");

// require all files from the models directory
require('fs').readdirSync(normalizedPath).forEach(function(file) {
	require("./models/" + file);
});


exports.getUserId = function (req, res) {
	console.log('TODO: generate ID: ', req.body);

	return res.status(200).send('42');
};
