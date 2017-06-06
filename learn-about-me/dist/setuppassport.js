"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = require("./models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal2.default.Strategy;

exports.default = function () {

    _passport2.default.serializeUser(function (user, done) {
        done(null, user._id);
    });

    _passport2.default.deserializeUser(function (id, done) {
        _user2.default.findById(id, function (err, user) {
            done(err, user);
        });
    });

    _passport2.default.use("login", new LocalStrategy(function (username, password, done) {
        _user2.default.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "No user has that username!" });
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password." });
                }
            });
        });
    }));
};