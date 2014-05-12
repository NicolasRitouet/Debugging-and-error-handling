'use strict';

angular.module('myApp', [])
.config(function($provide) {
    $provide.decorator('$log', function($delegate) {

        // Credits goes to Burleson Thomas for this implementation
        // http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/
        var _$log = (function( $log ) {
            return {
                log   : $log.log,
                info  : $log.info,
                warn  : $log.warn,
                debug : $log.debug,
                error : $log.error
            };
        })( $delegate );

        /**
         * Partial application to pre-capture a logger function
         */
        var prepareLogFn = function( logFn, className ) {
            var enhancedLogFn = function () {
                var args = [].slice.call(arguments);
                if (className) args.unshift(className);
                args.unshift(new Date().toISOString() + " -");
                logFn.apply(null, args)
            };

            return enhancedLogFn;
        };

        /**
         * Support to generate class-specific logger instance with classname only
         *
         * @param name
         * @returns Object wrapper facade to $log
         */
        var getInstance = function( className ) {
            className = ( className !== undefined ) ? className + "::" : "";

            return {
                log   : prepareLogFn( _$log.log,    className ),
                info  : prepareLogFn( _$log.info,   className ),
                warn  : prepareLogFn( _$log.warn,   className ),
                debug : prepareLogFn( _$log.debug,  className ),
                error : prepareLogFn( _$log.error,  className )
            };
        };

        $delegate.log   = prepareLogFn( $delegate.log );
        $delegate.info  = prepareLogFn( $delegate.info );
        $delegate.warn  = prepareLogFn( $delegate.warn );
        $delegate.debug = prepareLogFn( $delegate.debug );
        $delegate.error = prepareLogFn( $delegate.error );

        // Add special method to AngularJS $log
        $delegate.getInstance = getInstance;
 
        return $delegate;
    });
}).controller('LogExampleCtrl', function($scope, $log) {

    // Set the instance of the logger
    $log = $log.getInstance("LogExampleCtrl");


    // Try the enhanced $log service
    $log.log("Enter controller");

    $scope.executeLog = function() {
        $log.log("Button clicked !");
    }
});