(function() {
  'use strict';

  describe('controllers', function(){
    var vm,
      deferred1,
      deferred2,
      $scope;

    beforeEach(module('repoFinder'));
    beforeEach(inject(function($controller, _$q_, _$rootScope_, _toastr_, _repoFinderService_) {
      deferred1 = _$q_.defer();
      deferred2 = _$q_.defer();
      spyOn(_repoFinderService_, "userProfile").and.returnValue(deferred1.promise);
      spyOn(_repoFinderService_, "repoList").and.returnValue(deferred2.promise);

      $scope = _$rootScope_.$new();

      vm = $controller('RepoController', {
        repoFinderService: _repoFinderService_
      });

    }));

    describe('after repoController activation', function(){

      it('should test the user profile', function(){
        vm.repoListUserProfileDisplay();
        deferred1.resolve(sample_profile);
        $scope.$apply();
        expect(vm.result.userProfile.login).toEqual("sapna");
      });

      it('should test the repo list', function(){
        vm.repoListUserProfileDisplay();
        deferred2.resolve(sample_repo);
        $scope.$apply();
        expect(vm.result.repoList[1].name).toEqual("miniTwitter");
      });

    });

    it('should have an empty data object', function() {
      expect(vm.data).toEqual({});
    });
  });
})();
