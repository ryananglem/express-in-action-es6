"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get("/random/:min/:max", function (req, res) {
	var min = parseInt(req.params.min);
	var max = parseInt(req.params.max);

	if (isNaN(min) || isNaN(max)) {
		res.status(400);
		res.json({ error: "Bad request" });
		return;
	}
	var result = Math.round(Math.random() * (max - min) + min);
	res.json({ result: result });
});
var port = 3000;
app.listen(port, function () {
	console.log("App started on port " + port);
});