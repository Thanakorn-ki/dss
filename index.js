var express = require('express')
var app = express()
var body = require('body-parser')
var json = body.json()

app.use(express.static('public'))

app.post('/search', json, function (req, res) {
  var send
  var get = apis(send, req.body)
  // console.log(get)
  res.send('reqs')
})

function apis (send, data) {
  // console.log('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=AIzaSyDTx6k0EMtaMUJL1gP9w4rDc4qwp8LnDMc');
  app.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + data.location_now + '&query=' + data.test + '&radius=' + data.radius + '&key=AIzaSyDTx6k0EMtaMUJL1gP9w4rDc4qwp8LnDMc', function (req, res) {
    console.log('gg');
    send = reqs
  })
  return send
}
app.listen(3000, function () {})
