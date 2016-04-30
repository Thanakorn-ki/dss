var express = require('express')
var app = express()
var body = require('body-parser')
var json = body.json()
var request = require('request')
app.use(express.static('public'))

app.post('/search', json, function (req, res) {
  var data = req.body
  request('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=AIzaSyDTx6k0EMtaMUJL1gP9w4rDc4qwp8LnDMc', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body)
    }
  })
})

app.listen(3000, function () {})
