'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/repo/:repoId', {
    templateUrl: 'view2/view2.html',
    controller: 'RepoController'
  });
}])
