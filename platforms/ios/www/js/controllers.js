angular.module('starter.controllers', []).controller('HomeCtrl', function ($scope) {}).controller('RunsCtrl', function ($scope, Runs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.runs = Runs.all();
}).controller('RunPlayCtrl', function ($scope, $stateParams, $cordovaGeolocation, $ionicPlatform, Runs, $cordovaMedia) {
  $scope.run = Runs.get($stateParams.runId);

  var run0 = [
    {
      latitude: 42.451680302995726,
      longitude: -79.33801263570786,
      radius: 10,
      mp3: 'audio/ukulele.mp3',
      title: 'Start'
    }, {
      latitude: 42.45201872123995,
      longitude: -79.33761835098267,
      radius: 10,
      mp3: 'audio/dubstep.mp3',
      title: 'Maytum'
    }, {
      latitude: 42.452513481464116,
      longitude: -79.33792144060135,
      radius: 10,
      mp3: 'audio/airy.mp3',
      title: 'Popeye'
    },
    {
      latitude: 42.45214340118479,
      longitude: -79.33835595846175,
      radius: 10,
      mp3: 'audio/rock.mp3',
      title: 'King'
    }
  ];

  // lat1 and lon 1 are the current location of the device
  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

    return 12742000 * Math.asin(Math.sqrt(a)); // return distance in metres
  };

  function playAudio(src) {

    if ($scope.media) {
      $scope.media.stop();
      $scope.media.release();
    }
    $scope.media = $cordovaMedia.newMedia(src);
    $scope.media.play({ numberOfLoops: 1, playAudioWhenScreenIsLocked: true });
  };

  function runTimeline() {
    // loop through the timeline data, play any audio, and then getCoords();
    for (var i = 0; i < run0.length; i++) {
      if (distance($scope.position.coords.latitude, $scope.position.coords.longitude, run0[i].latitude, run0[i].longitude) < run0[i].radius && run0[i].played != true) {
        console.log(run0[i].title + " is only " + distance($scope.position.coords.latitude, $scope.position.coords.longitude, run0[i].latitude, run0[i].longitude) + " Metres away!"); // This is where the mp3 will play
        playAudio(run0[i].mp3);
        run0[i].played = true;
      }
    }
  };

  function updateMap() {
    // Update map
    var newLatLng = new google.maps.LatLng($scope.position.coords.latitude, $scope.position.coords.longitude);
    $scope.marker.setPosition(newLatLng);
    map.setCenter({
      lat: $scope.position.coords.latitude,
      lng: $scope.position.coords.longitude
    });
    runTimeline();
  };

  function onErrorPosition(error) {
    console.log('code: ' + error.code + 'message: ' + error.message);
  };

  var map;

  function showMap(lat, long) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: lat, lng: long },
      zoom: 18,
      disableDefaultUI: true,
      mapTypeId: 'hybrid'
    });
    var marker = new google.maps.Marker({
      position: { lat: lat, lng: long },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#387ef5',
        fillOpacity: 1,
        strokeColor: 'white',
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
  };

  function updateCoords(newCoords) {
    $scope.position = newCoords;
    console.log("lat " + $scope.position.coords.latitude + " long " + $scope.position.coords.longitude);
    updateMap();
  };

  $ionicPlatform.ready(function () {
    showMap(0, 0);
    navigator.geolocation.watchPosition(updateCoords, onErrorPosition, { maximumAge: 1000, timeout: 30000, enableHighAccuracy: true });
  });
});
