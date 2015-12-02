'use strict';

angular.module('myApp.repoView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/repo/:repoId', {
    templateUrl: 'repoView/repoView.html',
    controller: 'RepoController'
  });
}])
