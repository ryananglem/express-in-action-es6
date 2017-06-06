'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_FACTOR = 10;

var userSchema = _mongoose2.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: String,
    bio: String
});

var noop = function noop() {};

userSchema.pre("save", function (done) {
    var user = this;

    if (!user.isModified("password")) {
        return done();
    }

    _bcryptNodejs2.default.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        _bcryptNodejs2.default.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function (guess, done) {
    _bcryptNodejs2.default.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.methods.name = function () {
    return this.displayName || this.username;
};

var User = _mongoose2.default.model("User", userSchema);

module.exports = User;
/*
//const User = (user) => {

    const userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
        displayName: String,
        bio: String
    })

    const noOp = () => {
    }

    userSchema.pre("save", done => {

        const user = this
        console.log("user to save", user)
        if (!user.isModified("password")) {
            return done()
        }
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            if (err) {
                return done(err)
            }
            bcrypt.hash(user.password, salt, noOp, (err, hashedPassword) => {
                if (err) {
                    return done(err)
                }
                user.password = hashedPassword
                done()
            })
        })
    })
    userSchema.methods.checkPassword = (guess, done) => {
        bcrypt.compare(guess, this.password, (err, isMatch) => {
            done(err, isMatch)
        })
    }
    userSchema.methods.name = () => {
        return this.displayName || this.username
    }
    const User = mongoose.model("User", userSchema)
//}
export default User
*/

/*
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: String,
    bio: String
})

const noOp = () => {}

userSchema.pre("save", done => {
    const user = this
    console.log("user", user)
    if (!user.isModified("password")) {
        return done()
    }
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if(err) { return done(err)}
        bcrypt.hash(user.password, salt, noOp, (err, hashedPassword) => {
            if(err) { return done(err)}
            user.password = hashedPassword
            done()
        })
    })
})
userSchema.methods.checkPassword = (guess, done) => {
    bcrypt.compare(guess, this.password, (err, isMatch) => {
        done(err, isMatch)
    })
}
userSchema.methods.name = () => {
    return this.displayName || this.userName
}

export const User = mongoose.model("User", userSchema)


*/