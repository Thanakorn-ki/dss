/* global angular */
angular.module('todoApp', ['ui.materialize'])
  .controller('TodoListController', function ($http, $scope) {
    $scope.test = ''
    $scope.radius = 10
    $scope.routes = []
    $scope.location_now = '13.7468351,100.5327397'
    $scope.key = 'AIzaSyA9pnLokpiT4egOd3J5Lhfb1I5PHmwyyXk'
    $scope.getLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        alert('Geolocation is not supported by this browser.')
      }
    }

    function showPosition (position) {
      $scope.Latitude = position.coords.latitude
      $scope.Longitude = position.coords.longitude
      $scope.location_now = $scope.Latitude + ',' + $scope.Longitude
      console.log($scope.location_now)
    }

    $scope.select = function () {
      $scope.routes = []
      $scope.temp = {}
      var data = {
        location_now: $scope.location_now,
        test: $scope.test,
        radius: $scope.radius
      }
      $scope.load = true
      if ($scope.test !== '' && $scope.radius !== 0) {
        $http.post('/search', data).then(function (req, res) {
          if (req.data.status === 'OK') {
            $scope.map = req.data.results
            $scope.map.forEach(function (item) {
              ways(item)
            })
            $scope.load = false
          } else if (req.data.status === 'OVER_QUERY_LIMIT') {
            $scope.load = false
            console.log('Time LIMIT(ค้นหา)')
          }
        })
      } else {
        $scope.load = false
      }
    }
    var ways = function (item) {
      var multi = {
        let: item.geometry.location.lat,
        lng: item.geometry.location.lng,
        location_now: $scope.location_now
      }
      $http.post('/ways', multi).then(function (req, res) {
        if (req.data.status === 'OK') {
          var pho
          if (!('photos' in item)) {
            pho = 'images/not.png'
          } else {
            pho = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + $scope.key
          }
          if (req.data.routes[0].legs[0].distance.value <= ($scope.radius * 1000)) {
            $scope.temp = {
              icon: item.icon,
              name: item.name,
              geometry: {
                location: {
                  lat: item.geometry.location.lat,
                  lng: item.geometry.location.lng
                }
              },
              distance: req.data.routes[0].legs[0].distance,
              duration: req.data.routes[0].legs[0].duration,
              photos: pho,
              vicinity: item.formatted_address
            }
            $scope.routes.push(temp)
            $scope.routes.sort(function (a, b) { // เรียงค่า น้อย ไป มาก
              if (a.distance.value > b.distance.value) return 1
              if (a.distance.value < b.distance.value) return -1
              return 0
            })
          }
        // console.log($scope.routes)
        } else if (req.data.status === 'OVER_QUERY_LIMIT') {
          console.log('Time LIMIT(ระยะทาง)')
        }
      })
    }
  })
