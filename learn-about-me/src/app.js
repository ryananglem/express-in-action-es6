import express from 'express'
import mongoose from 'mongoose'

import path from 'path'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'
import routes from './routes'

import passport from 'passport'
import setUpPassport from "./setuppassport"

const app = express()

mongoose.connect("mongodb://localhost:27017/test")
setUpPassport()

app.set("port", process.env.PORT || 3001)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"));
});
