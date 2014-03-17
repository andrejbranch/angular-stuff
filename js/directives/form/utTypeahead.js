define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utTypeahead', function ($http) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    $scope.getItems = function (search) {
                        return $http.get('/api/' + $scope.resource + '?search=' + search).then(function (response) {
                            return response.data;
                        });
                    }

                    $scope.$watch('model', function (v) {
                        if (typeof v != 'undefined') {
                            $scope.key = $scope.resourcePrimaryKey
                                ? v[$scope.resourcePrimaryKey]
                                : v.id
                            ;
                        }
                    });

                    if (attrs.disabled == '') {
                        element.find('input').attr('disabled', 'disabled');
                    }

                    $scope.$watch('disabled', function (v) {
                        if (v) {
                            element.find('input').attr('disabled', 'disabled');
                        } else {
                            element.find('input').removeAttr('disabled');
                        }
                    });
                },
                scope: {
                    model: '=',
                    key: '=',
                    placeholder: '@',
                    resourcePrimaryKey: '@',
                    resource: '@',
                    templateUrl: '@',
                    error: '=',
                    callback: '=',
                    disabled: '=',
                    hint: '@'
                },
                templateUrl: '/app/partials/form/utTypeahead.html'
            }
        })
    ;
});