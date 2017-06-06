'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});
router.get("/", function (req, res, next) {
    _user2.default.find().sort({ createdAt: "descending" }).exec(function (err, users) {
        if (err) {
            return next(err);
        }
        res.render("index", { users: users });
    });
});

router.get("/signup", function (req, res) {
    res.render("signup");
});
router.post("/signup", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    _user2.default.findOne({ username: username }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }
        var newUser = new _user2.default({
            username: username,
            password: password
        });
        console.log("newUser", newUser);
        newUser.save(next);
    });
}, _passport2.default.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));
exports.default = router;