'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'pascalprecht.github-adapter',
  'ngMaterial',
  'ngAria'
]).
config(['$routeProvider', '$githubProvider', function($routeProvider, $githubProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  $githubProvider.username(username);
  $githubProvider.password(password);
  $githubProvider.authType('basic');
}]);

myApp.controller('MainController', ['$scope', '$location', '$github', 'githubService', function($scope, $location, $github, githubService) {
  window.$G = $github;
  githubService.getUserInfo(function(userInfo) {
    $scope.userInfo = userInfo;
  });
  githubService.getRepos(function(repos) {
    $scope.repos = repos;
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };
}]);

myApp.controller('RepoController', ['$scope', '$route', '$github', 'githubService', function($scope, $route, $github, githubService) {
  window.$G = $github;
  githubService.getRepoInfo(function(repoInfo) {
    $scope.repoInfo = repoInfo;
  }, $route.current.params.repoId);
}]);


myApp.factory('githubService', function($github) {
  window.$G = $github;
  var getUserInfo = function(callbackFn) {
    $github.getUser().then(function(user) {
      user.show().then(function(userInfo) {
        callbackFn(userInfo);
      });
    });
  };

  var getRepos = function(callbackFn) {
    $github.getUser().then(function(user) {
      user.repos().then(function(repos) {
        callbackFn(repos);
      });
    });
  };

  var getRepoInfo = function(callbackFn, repoName) {
    $github.getRepo("gwenaelp", repoName).then(function(repo) {
      repo.show().then(function(repoInfo) {
        callbackFn(repoInfo);
      })
    });
  };

  return {
    getUserInfo: getUserInfo,
    getRepos: getRepos,
    getRepoInfo: getRepoInfo
  };
});