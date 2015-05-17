'use strict';

/**
 * @ngdoc function
 * @name pokomonApp.controller:SharectrlCtrl
 * @description
 * # SharectrlCtrl
 * Controller of the pokomonApp
 */
angular.module('pokomonApp')
  .controller('shareCtrl', function ($scope) {
    

    $scope.fbShare = function fbShare(){
    	var shareConfig = {
    		method: "share",
    		name: "pokomon",
    		link: "http://pokomon.herokuapp.com",
    		href: "http://pokomon.herokuapp.com",
    		description: "I just found this cool thing on pokogram!"
    	}
    	FB.ui(shareConfig, function(res){
    		console.log(res);
    	});
    };

  });
