define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utContainsText', function ($stateParams, $state) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    $scope.search = $stateParams.contains;

                    $scope.$watch('search', function (v) {
                        if (v) { $stateParams.contains = v; }
                    });

                    element.on('keyup', function (e) {
                        if (e.keyCode == 13) {
                            $stateParams.contains = $scope.search;
                            $stateParams.page = 1;
                            $state.go($state.$current.name, $stateParams);
                        }
                    });
                },
                scope: {},
                template: '<input type="text" placeholder="Contains text" ng-model="search"></input>'
            }
        })
    ;
});