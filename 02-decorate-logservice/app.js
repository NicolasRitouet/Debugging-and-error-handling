'use strict';

angular.module('myApp', [])
.config(function($provide) {
    $provide.decorator('$log', function($delegate) {
        var originalLogFn = $delegate.log;
        $delegate.log = function() {
            var args = [].slice.call(arguments);
            args.unshift(new Date().toISOString());
            originalLogFn.apply(null, args)
        };
        return $delegate;
    });
}).controller('LogExampleCtrl', function($scope, $log) {

    // Try the enhanced $log service
    $log.log("Enter controller");

    $scope.executeLog = function() {
        $log.log("Button clicked !");
    }
});