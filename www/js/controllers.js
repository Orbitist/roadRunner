angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('RunsCtrl', function($scope, Runs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.runs = Runs.all();
})

.controller('RunPlayCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPlatform, Runs) {
  $scope.run = Runs.get($stateParams.runId);

  var map;
  function showMap(coords) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: coords.latitude, lng: coords.longitude},
      zoom: 13
    });
  }

  $ionicPlatform.ready(function() {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.coords = position.coords;
        showMap(position.coords);
      }, function(err) {
        console.log('getCurrentPosition error: ' + angular.toJson(err));
      });
  });

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
