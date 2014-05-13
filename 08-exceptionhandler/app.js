'use strict';

angular.module('myApp', [])
.config(function($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, $window, $injector) {
    return function(exception, cause) {

      // keep the original logic
      $delegate(exception, cause);

      var data = {
        message: exception.stack || exception.message || exception || '',
        cause: cause || '',
        errorUrl: $window.location.href,
        clientSideDate: new Date().getTime()
      }

      // Bypassing angular's http abstraction to avoid Circular dependency error
      $injector.get('$httpBackend')('POST', '/errors', angular.toJson(data),
        angular.noop, { 'content-type': 'application/json' });
    };
  });
})
.controller('LogExampleCtrl', function($scope, $log) {
    
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
    $scope.throwException = function() {
        throw new Error("An error has occured")
    }
});