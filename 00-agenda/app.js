'use strict';

angular.module('myApp', [])
.controller('ConsoleExampleCtrl', function($scope) {

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

    $scope.backgroundNumber = 0;

    $scope.newWallPaper = function() {
        var wallpaperNewURL = "url('../wallpapers/" + ($scope.backgroundNumber + 1) + ".jpg')";
        $('html').css('background-image', wallpaperNewURL);
        $scope.backgroundNumber++;
    }

    $scope.showCode = 0;
    
    $scope.btnActionLabel = "Different levels";

    $scope.showNextDemo = function() {
        $scope.showCode = ($scope.showCode + 1) % 3;
        if ($scope.showCode == 0) {
            $scope.btnActionLabel = "Different levels";
        } else if ($scope.showCode == 1) {
            $scope.btnActionLabel = "Advanced methods";
        } else {
            $scope.btnActionLabel = "Monitor events";
        }
        window.setTimeout(function() {
            calculatePosition();
        }, 0);
    }

    $scope.showPreviousDemo = function() {
        $scope.showCode = ($scope.showCode - 1) % 3;
        if ($scope.showCode == 0) {
            $scope.btnActionLabel = "Different levels";
        } else if ($scope.showCode == 1) {
            $scope.btnActionLabel = "Advanced methods";
        } else {
            $scope.btnActionLabel = "Monitor events";
        }
        window.setTimeout(function() {
            calculatePosition();
        }, 0);
    }

    $scope.consoleDispatcher = function() {
        if ($scope.showCode == 0) {
            $scope.consoleLevels();
        } else if ($scope.showCode == 1)
        {
            $scope.consoleAdvanced();
        }
    }

    $scope.consoleLevels = function() {
        console.log("This is a log using log()", objectToDebug);
        console.info("This is a log using info()", objectToDebug);
        console.error("This is a log using error()", objectToDebug);
        console.warn("This is a log using warn()", objectToDebug);
        console.debug("This is a log using debug()", objectToDebug);
    }

    $scope.consoleAdvanced = function() {
        var groupName = "Advanced methods";
        console.group(groupName);
        console.assert(!groupName, groupName);
        console.time(groupName);
        console.log("Let's regroup our log calls");
        console.dir(objectToDebug);
        console.dir(objectToDebug);
        console.table(arrayToDebug);
        console.timeEnd(groupName);
        console.groupEnd(groupName);
        console.dir(console);
    }
});