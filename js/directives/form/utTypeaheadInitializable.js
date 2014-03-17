define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utTypeaheadInitializable', function () {
            return {
                require: ['ngModel'],
                restrict: 'A',
                link: function ($scope, element, attrs, ctrls) {
                    element.on('focus', function () {
                        $scope.init();
                    });

                    $scope.init = function () {
                        if (element.attr('disabled')) {
                            return;
                        }

                        var val = element.val() ? element.val() : '%';

                        ctrls[0].$setViewValue(val);
                    }
                }
            }
        })
    ;
});