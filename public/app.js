/* global angular */
angular.module('todoApp', ['ui.materialize'])
  .controller('TodoListController', function ($http, $scope) {
    $scope.test = ''
    $scope.radius = 500
    $scope.location_now = '13.7468351,100.5327397'
    $scope.select = function () {
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
            $scope.ways()
          }else if (req.data.status === 'OVER_QUERY_LIMIT') {
            $scope.load = false
            alert('time LIMIT')
          }
        console.log(req.data.results)
        })
      } else {
        $scope.load = false
      }
    }
    $scope.ways = function () {
      var data = {
        location_now: $scope.location_now,
        test: $scope.test,
        radius: $scope.radius
      }
      $http.post('/ways', data).then(function (req, res) {
        console.log(req.data)
      })
    }
  })
