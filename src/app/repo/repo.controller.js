(function() {
  'use strict';

  angular
    .module('repoFinder')
    .controller('RepoController', RepoController);

  /** @ngInject */
  function RepoController($timeout, toastr, repoFinderService) {
    var vm = this;
    vm.data = {};
    vm.repoListUserProfileDisplay = function () {
      vm.result ={};
      vm.result.repoList = null;
      vm.reposListError = false;
      vm.result.userProfile = null;
      vm.userProfileError = false;


      repoFinderService.userProfile(vm.data.username)
        .then(function(results) {
          toastr.info("Fetched userProfile successfully");
          vm.result.userProfile = results;
          console.log("results userProfile th econtroller######",results);
        }, function(response){
          vm.userProfileError = true;
          vm.userProfileErrorMessage = response.status + "=" +response.data.message;

        });

      repoFinderService.repoList(vm.data.username)
        .then(function (results) {
          toastr.info("Fetched repo list successfully");
          vm.result.repoList = results;
          console.log("results inside th econtroller######",results);
        }, function(response){
          vm.reposListError = true;
          vm.repoListErrorMessage = response.status + "=" +response.data.message;
        });

    };
  }
})();
