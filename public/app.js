/* global angular */
angular.module('todoApp', ['ui.materialize'])
  .controller('TodoListController', function ($http, $scope) {
    $scope.test = ''
    $scope.radius = 500
    $scope.routes = []
    $scope.location_now = '13.7468351,100.5327397'
    $scope.select = function () {
      $scope.routes = []
      var data = {
        location_now: $scope.location_now,
        test: $scope.test,
        radius: $scope.radius
      }
      $scope.load = true
      if ($scope.test !== '' && $scope.radius !== 0) {
        $http.post('/search', data).then(function (req, res) {
          if (req.data.status === 'OK') {
            $scope.load = false
            $scope.map = req.data.results
            $scope.map.forEach(function (item) { ways(item) })
          }else if (req.data.status === 'OVER_QUERY_LIMIT') {
            $scope.load = false
            console.log('Time LIMIT(ค้นหา)')
          }
        // console.log(req.data.results)
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
          if (typeof item.photos.photo_reference !== null) {
            pho = item.photos[0].photo_reference
          } else {
            pho = 'not'
          }
          var temp = {
            icon: item.icon,
            name: item.name,
            geometry: {
              location: {
                lat: item.geometry.location.lat,
                lng: item.geometry.location.lng
            }},
            distance: req.data.routes[0].legs[0].distance,
            duration: req.data.routes[0].legs[0].duration,
            photos: pho,
            vicinity : item.formatted_address
          }

          $scope.routes.push(temp)
          $scope.routes.sort(function (a, b) { // เรียงค่า น้อย ไป มาก
            if (a.distance.value > b.distance.value) return 1
            if (a.distance.value < b.distance.value) return -1
            return 0
          })
          // console.log($scope.routes)
        } else if (req.data.status === 'OVER_QUERY_LIMIT') {
          console.log('Time LIMIT(ระยะทาง)')
        }
      })
    }
  })
