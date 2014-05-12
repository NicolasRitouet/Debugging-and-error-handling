'use strict';

angular.module('myApp', [])
.controller('BreakpointsExampleCtrl', function($scope) {
    
    var objectToDebug = {
        name: 'This is an object',
        id: 2,
        child: {
            subname: 'the child !'
        }
    }
    var arrayToDebug = [
        {
            firstName: 'John',
            lastName: 'Doe',
            age: 33
        },
        {
            firstName: 'Pierre',
            lastName: 'Dupont',
            age: 42,
            city: 'Paris'
        }
    ];
    $scope.execute = function() {
        console.debug("This is a log using info()", objectToDebug);
    }
});