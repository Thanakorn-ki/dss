var express = require('express')
var app = express()
var body = require('body-parser')
var json = body.json()
var request = require('request')
app.use(express.static('public'))

app.post('/search', json, function (req, res) {
  var data = req.body
  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=AIzaSyA9pnLokpiT4egOd3J5Lhfb1I5PHmwyyXk', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body)
    // console.log(body)
    }
  })
})
app.post('/ways', json, function (req, res) {
  var datas = req.body
  request('https://maps.googleapis.com/maps/api/directions/json?origin=14.16631,101.3544531&destination=14.1644697,101.3635071&key=AIzaSyA9pnLokpiT4egOd3J5Lhfb1I5PHmwyyXk', function (error, response, bodys) {
    if (!error && response.statusCode === 200) {
      res.send(body)
    }
  })
})

app.listen(3000, function () {})
