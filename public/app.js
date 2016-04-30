/* global angular */
angular.module('todoApp', ['ui.materialize'])
  .controller('TodoListController', function ($http, $scope) {
    $scope.test = ''
    $scope.radius = 500
    $scope.location_now = '13.7468351,100.5327397'
    $scope.select = function () {
      $scope.load = true
      if ($scope.test !== '' && $scope.radius !== 0) {
        var data = {
          location_now: $scope.location_now,
          test: $scope.test,
          radius: $scope.radius
        }
        $http.post('/search', data).then(function (req, res) {
          $scope.load = false
          $scope.map = req.data.results
          console.log(req.data.results)
        })
      } else {
        $scope.load = false
      }
    }
  })
