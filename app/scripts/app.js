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
    'ngRoute','ngSanitize', 'ui.select'
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
