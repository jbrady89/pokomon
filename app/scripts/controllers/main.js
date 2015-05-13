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
    $scope.firstList = ['abilities', 'cities and towns', 'items', 'locations', 'moves', 'natures', 'pokemons', 'regions'];
    $scope.lettersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    console.log($scope.lettersList);
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

    		var data = response.data;
				
			
			$scope.secondList = data;

			// reset the second one when a new first one is selected
			$scope.secondItem.selected = undefined;
			$scope.secondDisabled = false;
    	};

    // value of ng-show attribute set based on this
	$scope.gotResults = function(){

		var results = $scope.results || [];

		if (results.length > 0){
			return true;
		} else {
			return false;
		}
	}

	// fires when first item is selected
    $scope.firstItemSelected = function($item, $model){

        if ( $item.match(/^(natures|regions)$/) ){

            path = "/data/" + $item + ".json";
            $scope.longList = false;
            $scope.secondDisabled = false;
            getSecondListFrom(path)
            .then(createArray);
            
        } else {
            $scope.secondList = $scope.lettersList;
            $scope.longList = true;
            $scope.secondItem.selected = undefined;
            $scope.secondDisabled = false;
        }

    }

    // fires when second item is selected
    $scope.secondItemSelected = function($item, $model){
    	//console.log("second item selected " + $item);
        
        if ( $.inArray($item, $scope.lettersList) !== -1) {
            //show 3rd dropdown
            if ($scope.firstItem.selected == "cities and towns"){
                path = "/data/cities.json";
            } else {
                path = "/data/" + $scope.firstItem.selected + ".json";
            }

            $http.get(path)
            .then(function(response){

                var items = response.data
                var filteredList = items.filter(function(item){
                    return item.letter == $item;
                });

                $scope.thirdList = filteredList;
                $scope.thirdDisabled = false;

            });

        } else {

            // return some results based on the first and second items
            var first = firstItem.selected;
            var second = secondItem.selected;
            console.log(first, second);

            // put our returned results here
            $scope.results = ["a", "b", "3"];

        }

    }

    var lookUp = function(index, type){
        console.log(index, type);
    }

    var reverseLookup = function(results){
        console.dir(JSON.stringify(results))
        results.forEach(function(result){
            result.forEach(function(obj){
                console.log(obj);
                console.log(Object.keys(obj));
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i += 2){
                    lookUp(obj[keys[i]], obj[keys[i + 1]]);
                }
            });
        });
    }

    $scope.thirdItemSelected = function($item, $model){
        //console.log($item);
        //console.log($model);

        console.log($item.ids);
        // this is the array with the indexes to look up in matches.json
        var matchesArray = $item.ids;
        $http.get("/data/matches.json")
        .then(function(matches){
            var matches = matches.data;
            var returnedMatches = matchesArray.map(function(index){
                console.log(index);
                return matches[index - 1].matches
            });
            console.dir(returnedMatches);
            $scope.results = returnedMatches;
            reverseLookup($scope.results);

        });
    }

  });
