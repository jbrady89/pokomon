'use strict';

/**
 * @ngdoc service
 * @name pokomonApp.listService
 * @description
 * # listService
 * Factory in the pokomonApp.
 */
angular.module('pokomonApp')
  .factory('listService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
