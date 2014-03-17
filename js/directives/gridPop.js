define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utGridPop', function ($document) {
            return {
                restrict: 'E',
                link: function ($scope, element, attr) {
                    $scope.search = null;
                    $scope.resource = attr.resource;
                    $scope.properties = attr.properties.split(' ');
                    $scope.method = attr.method;
                    $scope.page = 1;
                    $scope.setInput = function (data) {
                        $scope.value = data.value;
                        $scope.search = data.placeholder;
                        $scope.hidden = false;
                        if (typeof $scope.gridPopCallBack == 'function') {
                            $scope.gridPopCallBack(data);
                        }
                    };
                    $scope.nextPage = function () {
                        $scope.page++;
                        $scope.query($scope.search, $scope.page);
                    }
                    $scope.previousPage = function () {
                        if ($scope.page == 1) return;
                        $scope.page--;
                        $scope.query($scope.search, $scope.page);
                    }

                    element.on('keyup', function (event) {
                        $scope.page = 1;
                        $scope.query($scope.search, $scope.page);
                    });

                    // prevent text selection
                    angular.element('div.grid-pop-results-container').on('mousedown', function (event) {
                        event.preventDefault();
                    });
               },
                controller: 'GridPopController',
                templateUrl: '/app/partials/gridPop/gridPop.html'
            };
        })
        .directive('utPositionAware', function ($document) {
            return {
                link: function ($scope, element, attr) {
                    $scope.adjust = function () {
                        var container, left, width, windowWidth, marginLeft;

                        left = element.offset().left;
                        width = element.width();
                        windowWidth = window.innerWidth;

                        if ((width + left) > windowWidth) {
                            marginLeft = windowWidth - (width + left) - 100;
                            element.css('margin-left', marginLeft);
                        }
                    }
                }
            }
        });
});