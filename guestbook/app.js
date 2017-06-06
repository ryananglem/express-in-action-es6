import http from 'http'
import path from 'path'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

const entries = []
app.locals.entries = entries

app.use(logger("dev"))

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (request, response) => {
	response.render("index")
})

app.get("/new-entry", (request, response) => {
	response.render("new-entry")
})

app.post("/new-entry", (request, response) => {
	if (!request.body.title || !request.body.body) {
		response.status(400).send("Entries must have a title and body")
		return
	}
	console.log(request.body)
	entries.push( { 
		title: request.body.title,
		content: request.body.body,
		published: new Date()
	})
	response.redirect("/")
})
app.use((request, response) => {
	response.status(404).render("404")
})

const port = 3000
http.createServer(app).listen(port, () => {
	console.log("Guestbook app started on port " + port)
})
	
	
