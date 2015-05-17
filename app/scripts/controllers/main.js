'use strict';

angular.module('pokomonApp')
.filter("removeEmpty", function(){
    return function(val){
        var str = val;
        console.log(val);
        var newStr = str.replace("<a href='' target='_blank'></a> +", "");
        return newStr;
    };
})
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
            console.log($item.ids);
        // this is the array with the indexes to look up in matches.json
        var matchesArray = $item.ids;
        $scope.loading = true;
        $http.get("/data/matches.json")
        .then(function(matches){
            console.log(matches);
            var matches = matches.data;
            var returnedMatches = matchesArray.map(function(index){
                console.log(index);
                return matches[index - 1].matches
            });
            console.dir(returnedMatches);
            $scope.results = returnedMatches;
            reverseLookup($scope.results);
            $scope.loading = false;

        })
        .catch(function(err){
            console.log(err);
        });

        }

    }
    var matches = [];

    (function loadData(){
        var fileNames = ["abilities", "cities", "items", "locations", "matches", "moves", "natures", "pokemons"]
        fileNames.forEach(function(name){
            $http.get("/data/" + name + ".json")
            .then(function(res){
                var contents = res.data;
                $scope[name] = contents;
            });
        });
    })();



    var lookUp = function(index, type){
        console.log(index, type);
        var matches = [];
        var type = type.toLowerCase();
        var typeArray = $scope[type];
        var match = typeArray[index - 1];
        matches.push(match.name);
        return matches;
    }

    var createEquationString = function(previousValue, currentValue, index){
        console.log(previousValue, currentValue);
        $scope.matchResults.push(equationString);

    }

    var reverseLookup = function(results){

        console.dir(JSON.stringify(results))
        $scope.matchResults = [];

        if (results.length){
            results.forEach(function(match){
            console.log(match);

            console.log(match.length);

            if (match.length == 2){

                var name1 = match[0][0].name;
                var url1 = match[0][0].url;
                var name2 = match[0][1].name;
                var url2 = match[0][1].url;
                var name3 = match[1][0].name;
                var url3 = match[1][0].url;
                var name4 = match[1][1].name;
                var url4 = match[1][1].url;

                var equationString = "<a href='" + url1 + "' target='_blank'>" + name1 + "</a> + " + 
                                     "<a href='" + url2 + "' target='_blank'>" + name2 + "</a> = " +
                                     "<a href='" + url3 + "' target='_blank'>" + name3 + "</a> + " + 
                                     "<a href='" + url4 + "' target='_blank'>" + name4 + "</a>";

                var shareText = name1 + " + " + name2 + " = " + name3 + " + " + name4;

                //$scope.matchResults.push(equationString);

            } else if (match.length == 3) {
                var name1 = match[0][0].name;
                var url1 = match[0][0].url;
                var name2 = match[0][1].name;
                var url2 = match[0][1].url;
                var name3 = match[1][0].name;
                var url3 = match[1][0].url;
                var name4 = match[1][1].name;
                var url4 = match[1][1].url;
                var name5 = match[2][0].name;
                var url5 = match[2][0].url;
                var name6 = match[2][1].name;
                var url6 = match[2][1].url;

                var equationString = "<a href='" + url1 + "' target='_blank'>" + name1 + "</a> + " + 
                                     "<a href='" + url2 + "' target='_blank'>" + name2 + "</a> = " +
                                     "<a href='" + url3 + "' target='_blank'>" + name3 + "</a> + " + 
                                     "<a href='" + url4 + "' target='_blank'>" + name4 + "</a> = " +
                                     "<a href='" + url5 + "' target='_blank'>" + name5 + "</a> + " + 
                                     "<a href='" + url6 + "' target='_blank'>" + name6 + "</a>";

                var shareText = url1 + " + " + url2 + " = " + url3 + " + " + url4 + " = " + url5 + " + " + url6;
            }

            var result = {
                    string: equationString,
                    shareText: shareText
                };

            $scope.matchResults.push(result);
            /*console.log(matches.length);
        
            match[0].name;

            var equationString = match.reduce(function(previousValue, currentValue, index, match){
                console.log(previousValue, currentValue);
                console.log(index);

                return createEquationString(previousValue, currentValue, index);
            });

            $scope.matchResults.push(equationString);*/
            $scope.gotMatchResults = true;
        });
        } else {
            $scope.gotMatchResults = false;
            $scope.matchResults = [{string : "there were no results for this criteria"}];
        }
        console.log($scope.matchResults);

    }

    $scope.thirdItemSelected = function($item, $model){
        //console.log($item);
        //console.log($model);

        console.log($item.ids);
        // this is the array with the indexes to look up in matches.json
        var matchesArray = $item.ids;
        $scope.loading = true;
        $http.get("/data/matches.json")
        .then(function(matches){
            console.log(matches);
            var matches = matches.data;
            var returnedMatches = matchesArray.map(function(index){
                console.log(index);
                return matches[index - 1].matches
            });
            console.dir(returnedMatches);
            $scope.results = returnedMatches;
            reverseLookup($scope.results);
            $scope.loading = false;

        })
        .catch(function(err){
            console.log(err);
        });
    }

    $scope.fbShare = function fbShare(){
        var shareConfig = {
            method: "feed",
            name: "pokomon",
            link: "http://pokomon.herokuapp.com",
            href: "http://pokomon.herokuapp.com",
            caption: "I just found this cool thing on pokogram!"
        }
        FB.ui(shareConfig, function(res){
            console.log(res);
        });
    };

  });
