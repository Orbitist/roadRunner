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

  function updateMap(newCoords) {
    // Update map
    var newLatLng = new google.maps.LatLng(newCoords.latitude, newCoords.longitude);
    $scope.marker.setPosition(newLatLng);
    // Check for actions
    // Wait 1 second then run getCoords again
    setTimeout(function (){
      getCoords();
    }, 1000);
    // getCoords()
  }

  function getCoords() {
    // Watch user location
    var posOptions = {timeout: 30000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.coords = position.coords;
      updateMap(position.coords);
    }, function(err) {
      console.log('getCurrentPosition error: ' + angular.toJson(err));
    });
  };

  var map;
  function showMap(coords) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: coords.latitude, lng: coords.longitude},
      zoom: 19,
      disableDefaultUI: true,
      mapTypeId: 'hybrid'
    });
    var marker = new google.maps.Marker({
      position: {lat: coords.latitude, lng: coords.longitude},
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: 'yellow',
        fillOpacity: 0.8,
        strokeColor: 'gold',
        strokeWeight: 5
      },
      map: map
    });
    $scope.marker = marker;
    // Hide spinner and remove it
    document.getElementById("spinner").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("spinner").style.display = "none";
    }, 500);
    getCoords();
  }

  $ionicPlatform.ready(function() {
    var posOptions = {timeout: 30000, enableHighAccuracy: true};
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
