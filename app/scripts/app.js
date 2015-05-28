'use strict';

/**
 * @ngdoc overview
 * @name pokomonApp
 * @description
 * # pokomonApp
 *
 * Main module of the application.
 */
angular
  .module('pokomonApp', [
    'ngRoute','ngSanitize', 'ui.select', '720kb.socialshare', 'ngAnimate','angular-toArrayFilter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
