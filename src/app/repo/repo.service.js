(function(){
  'use strict';

  angular
    .module('repoFinder')
    .factory('repoFinderService', repoFndrService);

  function repoFndrService($http, $q, $log, toastr){

    var service = {
      repoList: repoList,
      userProfile: userProfile
    };

    return service;

    function userProfile(username){

      return $http.get("http://jwttester.getsandbox.com/github/users/pradeep")
        .then(profileDetailsDisplay)
        .catch(profileErrorFunction);


      function profileDetailsDisplay(response){
        // console.log(" profileDetailsDisplay response $$$$$$", response.data);
        return response.data;
      }


      function profileErrorFunction(error){
        // console.log(" profileErrorFunction error ************", error);
        $log.error('XHR Failed for user profile retrieval');
        toastr.error("Error occurred while fetching user pofile");
        return $q.reject(error);
      }


    }

    function repoList(username){

        return $http.get("http://jwttester.getsandbox.com/github/users/pradeep/repos")
        .then(repoDetailsDisplay)
        .catch(repoErrorFunction);


      function repoDetailsDisplay(response){
        // console.log(" repoDetailsDisplay response $$$$$$", response.data);
        return response.data;
      }


      function repoErrorFunction(error){
        // console.log(" repoErrorFunction error ************", error);
        $log.error('XHR Failed for repo list retrieval.');
        toastr.error("Error occurred while fetching repo list");
        return $q.reject(error);
      }


    }


  }


})();
