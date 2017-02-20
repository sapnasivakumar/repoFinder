(function() {
  'use strict';

  describe('controllers', function(){
    var vm,
      deferred,
      $scope;

    beforeEach(module('repoFinder'));
    beforeEach(inject(function($controller, _$q_, _$rootScope_, _toastr_, _repoFinderService_) {
      $scope = _$rootScope_.$new();
      deferred = _$q_.defer();
      vm = $controller('RepoController', {
        repoFinderService: _repoFinderService_
      });
      spyOn(_repoFinderService_, "userProfile").and.returnValue(deferred.promise);
      spyOn(_repoFinderService_, "repoList").and.returnValue(deferred.promise);
    }));

    describe('after repoController activation', function(){

      it('should test the user profile', function(){
        deferred.resolve(sample_profile);
        $scope.$apply();
        expect(sample_profile.login).toEqual("sapna");
      });

      it('should test the repo list', function(){
        deferred.resolve(sample_repo);
        $scope.$apply();
        expect(sample_repo[1].name).toEqual("miniTwitter");
      });

    });

    it('should have an empty data object', function() {
      expect(vm.data).toEqual({});
    });
  });
})();
