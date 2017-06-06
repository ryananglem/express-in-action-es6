import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'

const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: String,
    bio: String
})

const noOp = function() {}

userSchema.pre("save", function(done) {
    var user = this

    if (!user.isModified("password")) {
        return done()
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) { return done(err) }
        bcrypt.hash(user.password, salt, noOp, (err, hashedPassword) => {
            if (err) { return done(err) }
            user.password = hashedPassword
            done()
        })
    })
})

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch)
    });
}

userSchema.methods.name = function() {
    return this.displayName || this.username
}


export default mongoose.model("User", userSchema)
