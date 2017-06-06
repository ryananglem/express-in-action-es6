'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _setuppassport = require('./setuppassport');

var _setuppassport2 = _interopRequireDefault(_setuppassport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect("mongodb://localhost:27017/test");
(0, _setuppassport2.default)();

app.set("port", process.env.PORT || 3001);

app.set("views", _path2.default.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));

app.use((0, _connectFlash2.default)());

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use(_routes2.default);

app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
});