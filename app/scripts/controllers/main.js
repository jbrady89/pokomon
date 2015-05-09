'use strict';

/**
 * @ngdoc function
 * @name pokomonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokomonApp
 */
angular.module('pokomonApp')
  .controller('MainCtrl', function ($http, $scope) {

  	// items to populate first list
    $scope.firstList = ['abilities', 'cities and towns', 'items', 'locations', 'moves', 'natures', 'pokemon', 'regions'];

    // second one is disabled until first one is selected
    $scope.secondDisabled = true;

    // these are the references to the currently selected criteria
    var firstItem = $scope.firstItem = {},
    	secondItem = $scope.secondItem = {},
   		path,
    	getSecondListFrom = function(path){
	    		return $http.get(path)
	    },
    	createArray = function(response){

    		var data = response.data,
				listArray = data.split("\n");
			
			$scope.secondList = listArray;

			// reset the second one when a new first one is selected
			$scope.secondItem.selected = undefined;
			$scope.secondDisabled = false;
    	};

    // value of ng-show attribute set based on this
	$scope.gotResults = function(){

		var results = $scope.results;

		if (results.length > 0){
			return true;
		} else {
			return false;
		}
	}

	// fires when first item is selected
    $scope.firstItemSelected = function($item, $model){

    	if ($item == "cities and towns"){
    		path = "/data/cities.txt";
    	} else {
    		path = "/data/" + $item + ".txt";
    	}

    	getSecondListFrom(path)
    	.then(createArray);

    }

    // fires when second item is selected
    $scope.secondItemSelected = function($item, $model){
    	//console.log("second item selected " + $item);

    	// return some results based on the first and second items
    	var first = firstItem.selected;
    	var second = secondItem.selected;
    	console.log(first, second);

    	// put our returned results here
    	$scope.results = ["a", "b", "3"];

    }

  });
