'use strict';

angular.module('myApp', [])
.controller('LogExampleCtrl', function($scope, $log, $http) {
    
    $scope.breakpointList = ['Simple breakpoints', 'Conditional breakpoints', 'Breakpoint on change event', 'Breakpoint on DOM change'];
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
        console.log("Loging my object: ", objectToDebug);
        console.debug("This is a log using debug()", objectToDebug);
        logCaller();
    }

    $scope.addItem = function() {
        $('#listToWatch').append("<li>DOM changed !</li>");
    }

    function logCaller() {
        console.info("And a last one with info()", objectToDebug, arrayToDebug);
    }
});