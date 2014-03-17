define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utEditModule', function ($stateParams, $state) {
            return {
                restrict: 'E',
                scope: { title: '@' },
                transclude: true,
                templateUrl: '/app/partials/form/utEditModule.html'
            }
        })
    ;
});