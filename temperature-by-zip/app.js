import path from 'path'
import express from 'express'
import zipdb from 'zippity-do-dah'
import ForecastIo from 'forecastio'

const app=express()
const weather = new ForecastIo('4bceaab8e2a6bed00fa28d0aea0ca80e') // https://darksky.net/dev/account  -> ryan.anglem@gmail.com


app.use(express.static(path.resolve(__dirname, "public")))

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
	res.render("index")
})

app.get(/^\/(\d{5})$/, (req, res, next) => {
	const zipcode = req.params[0]
	const location = zipdb.zipcode(zipcode)
	if (!location.zipcode) {
		next()
		return
	}

	const latitude = location.latitude
	const longitude = location.longitude

	weather.forecast(latitude, longitude, (err, data) => {
		if (err) {
			console.log("err", err)
			next()
			return
		}
		res.json({
			zipcode: zipcode,
			temperature: data.currently.temperature
		})
	})
})
app.use((request, response) => {
	response.status(404).render("404")
})

app.listen(3000)