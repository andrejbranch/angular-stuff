define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utControlGroup', function () {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    if (attrs.required == '') {
                        $scope.required = true;
                    }
                },
                scope: {
                    label: "@",
                    errors: "="
                },
                transclude: true,
                templateUrl: '/app/partials/form/controlGroup.html'
            }
        })
    ;
});