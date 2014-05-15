'use strict';


angular.module('myApp', [])
.controller('LogExampleCtrl', function($scope, $log, $http) {

    var maxRetry = 3;
    $scope.retries = 0;
    $scope.execute = function() {
        $scope.retries = 0;
        $scope.status = 'fa-spinner fa-spin';
        makeAjaxCall();
    }

    function successAjaxCall(response) {
        $scope.result = response.data.productItems.productItem[0];
        $log.log($scope.result);
        $scope.status = 'fa-thumbs-o-up';
    }

    function errorAjaxCall(err) {
        if (maxRetry > $scope.retries) {
            setTimeout(makeAjaxCall, 2000);
        } else {
            $scope.status = 'fa-exclamation-triangle';
        }
    }

    function makeAjaxCall() {
        $scope.retries++;
        $http.jsonp('http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&items=1&q=angularJs&partnership=all&callback=JSON_CALLBACK')
            .then(successAjaxCall, errorAjaxCall);
    }
});