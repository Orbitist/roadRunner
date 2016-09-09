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

.controller('RunPlayCtrl', function($scope, $stateParams, Runs) {
  $scope.run = Runs.get($stateParams.runId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
