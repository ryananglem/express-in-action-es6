import passport from "passport"
import passportlocal from "passport-local"

const LocalStrategy = passportlocal.Strategy

import User from "./models/user"

export default () => {

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use("login", new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err) }
            if (!user) {
                return done(null, false, { message: "No user has that username!" });
            }
            user.checkPassword(password, (err, isMatch) => {
                if (err) { return done(err) }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: "Invalid password." })
                }
            })
        })
    }))

}
