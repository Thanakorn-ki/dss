var express = require('express')
var app = express()
var body = require('body-parser')
var json = body.json()
var request = require('request')
app.use(express.static('public'))
var key = 'AIzaSyA9pnLokpiT4egOd3J5Lhfb1I5PHmwyyXk'
app.post('/search', json, function (req, res) {
  var data = req.body // ถูกส่งมาจาก app.js เป็น Object
  request('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=' + key + '&language=th', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body)
      // console.log('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=' + key + '&language=th')
    }
  })
})
app.post('/ways', json, function (req, res) {
  var results = req.body // ถูกส่งมาจาก app.js เป็น Object
  request('https://maps.googleapis.com/maps/api/directions/json?origin=' + results.location_now + '&destination=' + results.let + ',' + results.lng + '&key=' + key + '&language=th', function (error, response, bodys) {
    if (!error && response.statusCode === 200) {
      res.send(bodys)
      // console.log('https://maps.googleapis.com/maps/api/directions/json?origin=' + results.location_now + '&destination=' + results.let + ',' + results.lng + '&key=' + key + '&language=th')
    }
  })
})

app.listen(process.env.PORT || 3000, function () {})
