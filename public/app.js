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
          console.log(req.data)
        })

      // if ($scope.test !== '' && $scope.radius !== 0) {
      //
      //   $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location='+$scope.location_now +'&query=' + $scope.test + '&radius=' + $scope.radius + '&key=AIzaSyDTx6k0EMtaMUJL1gP9w4rDc4qwp8LnDMc')
      //     .then(function (res) {
      //       $scope.map = res.data
      //       console.log(res.data.results[0].geometry)
      //       $scope.map = $scope.map.results
      //       // console.log($scope.map)
      //       $scope.load = false
      //       // console.log($scope.load)
      //     }, function (err) {
      //       console.log('err')
      //     })
      } else {
        $scope.load = false
      // console.log($scope.test)
      }
    }
  })
