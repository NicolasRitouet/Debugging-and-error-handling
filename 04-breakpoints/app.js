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
        $scope.breakpointList.push('XHR Breakpoint');
    }

    $scope.ajaxCall = function() {
        $http.jsonp('http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&items=1&q=angularJs&partnership=all&callback=JSON_CALLBACK')
            .then(function(response) {
                $scope.result = response.data.productItems.productItem[0];
                $log.log($scope.result);
            });
    }

    function logCaller() {
        console.info("And a last one with info()", objectToDebug, arrayToDebug);
    }
});