'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pokomonApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  /*it('should return an array' , function(){
    var results = getSecondListFrom("pokemon");
    expect(results.isArray).toEqual(true);
  }*/


});
