define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utInput', function () {
            return {
                link: function ($scope, element, attrs) {
                    $scope.$watch('disabled', function (v) {
                        if (v) {
                            element.find('input').attr('disabled', 'disabled');
                        } else {
                            element.find('input').removeAttr('disabled');
                        }
                    });
                },
                restrict: 'E',
                scope: {
                    model: '=',
                    error: '=',
                    disabled: '='
                },
                template: '<input type="text" ng-model="model" class="ut-input" /><div ng-if="error" class="ut-global-error">{{error}}</div>'
            }
        })
    ;
});