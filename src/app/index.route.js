(function() {
  'use strict';

  angular
    .module('repoFinder')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/repo/repo.html',
        controller: 'RepoController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
