(function() {
  'use strict';
  describe('service', function(){
    var repoService,
      $httpBackend,
      $log;
    beforeEach(module('repoFinder'));
    beforeEach(inject(function(_repoFinderService_, _$httpBackend_, _$log_){
      repoService = _repoFinderService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function(){
      expect(repoService).not.toEqual(null);
    });

    describe('userProfile function', function(){

      it('should exist', function(){
        expect(repoService.userProfile).not.toEqual(null);
      });

      it('should return data', function(){
        var data;
        $httpBackend.when('GET', 'http://jwttester.getsandbox.com/github/users/pradeep').respond(200, sample_profile);
        repoService.userProfile({}).then(function(fetchedData){
          data= fetchedData;
        });
        $httpBackend.flush();
        expect(data.name).toEqual("Pradeep Murugesan");
        expect(data.public_repos).toBe(19);
      });


      it('should catch an error', function(){
        $httpBackend.when('GET', 'http://jwttester.getsandbox.com/github/users/pradeep').respond(500);
        repoService.userProfile({});
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for user profile retrieval'));
      });


    });


    describe('repoList', function(){

      it('should exist', function(){
        expect(repoService.repoList).not.toEqual(null);
      });

      it('should return data', function(){
        var data;
        $httpBackend.when('GET', 'http://jwttester.getsandbox.com/github/users/pradeep/repos').respond(200, sample_repo);
        repoService.repoList({}).then(function(fetchedData){
          data= fetchedData;
        });
        $httpBackend.flush();
        expect(data[1].id).toBe(58459844);
        expect(data[1].name).toEqual("miniTwitter");
      });

      it('should catch an error', function(){
        $httpBackend.when('GET', 'http://jwttester.getsandbox.com/github/users/pradeep/repos').respond(500);
        repoService.repoList({});
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for repo list retrieval.'));
      });


    });

  });

})();
