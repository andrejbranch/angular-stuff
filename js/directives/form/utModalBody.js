define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utModalBody', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    var elHeight, innerHeight;

                    $scope.resize = function () {
                        innerHeight = angular.element(window).height();
                        elHeight = element.css('max-height');
                        element.css('max-height', innerHeight - 250 + 'px');
                    }

                    $scope.$on('$destroy', function () {
                        angular.element(window).off('resize', $scope.resize);
                    })

                    angular.element(window).on('resize', $scope.resize);

                    $scope.resize();
                }
            }
        })
    ;
});