define(['directives'], function (directives) {
    'use strict';

    return directives
        .directive('utAppIcon', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    var hasPermission = $scope.group
                        ? utLoggedInUser.groups.indexOf($scope.group) > -1
                        : true
                    ;

                    if (!hasPermission) {
                        element.addClass('disabled');
                    }

                    element.on('click', function () {
                        if ($scope.link && hasPermission) {
                            window.location = $scope.link;
                        }
                    });
                },
                scope: {
                    group: '@',
                    link: '@',
                    title: '@'
                },
                template: '<div class="lead">{{title}}</div>',
                transclude: true
            }
        })
        .directive('utInventoryIcon', function ($state) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    var hasPermission = utLoggedInUser.groups.indexOf('users') > -1;
                    if (!hasPermission) {
                        $scope.disabled = true;
                    }
                    element.on('click', function () {
                        if ($scope.link && hasPermission) {
                            window.location = $scope.link;
                        }
                        if ($scope.sref && hasPermission) {
                            $state.go($scope.sref, $scope.params);
                        }
                    });
                },
                scope: {
                    link: '@',
                    sref: '@',
                    params: '=',
                    iconClass: '@'
                },
                template: '<div class="{{iconClass}}" ng-class="{disabled:disabled}"></div>'
            }
        });
});