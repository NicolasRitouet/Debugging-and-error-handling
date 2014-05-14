'use strict';

angular.module('myApp', [])
.controller('LogExampleCtrl', function($scope, $log) {
    
    $scope.objectToDebug = {
        name: 'This is an object',
        id: 2,
        child: {
            subname: 'the child !'
        }
    }
    $scope.arrayToDebug = [
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

    $scope.itemList = [
        {
            name: 'Models - Scopes'
        },
        {
            name:'Performance',
            link: '../imgs/batarang-perf.png'
        }, {
            name: 'Dependencies',
            link: '../imgs/batarang-deps.png'
        }];
    $scope.execute = function() {
        console.debug("This is a log using info()", $scope.objectToDebug);
    }
});