(function() {
  'use strict';

  angular
    .module('repoFinder')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
