define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utDropdown', function () {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    var onClick;

                    // assign this specific dropdown a id randomly generated between 1 and 3000
                    $scope.q = Math.floor(Math.random() * 3000);

                    $scope.toggle = function () {
                        $scope.active = $scope.active ? false : true;

                        // check for input with init-focus class
                        setTimeout(function () {
                            element.find('input.init-focus').focus();
                        });

                        var dropDownContainer = $(element.find('div.drop-down')),
                            width = dropDownContainer.width(),
                            elementLeft = element.position().left,
                            windowWidth = angular.element(window).width()
                        ;

                        if ((windowWidth - elementLeft) < width) {
                            $scope.left = true;
                        }

                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                            $scope.$apply();
                        }
                    }

                    // hide the drop down when user clicks anywhere else
                    onClick = function (e) {
                        var target = $(e.target);

                        if (target.hasClass('ut-btn') && target.hasClass($scope.q)) {
                            $scope.toggle();
                            return;
                        }

                        if (!target.parents('.ut-btn.' + $scope.q).length) {
                            $scope.$apply(function () {
                                $scope.active = false;
                            })
                        }
                    }

                    angular.element('body').on('click', onClick);

                    // make sure to unbind the click events that are on the body on destroy
                    element.on('$destroy', function () {
                        angular.element('body').off('click', onClick);
                    });

                    $scope.dropDown = {};
                    $scope.dropDown.title = '';
                    $scope.dropDown.init = null;

                    $scope.$watch('dropDown.title', function (v) {
                        $scope.title = v ? v : $scope.title;
                    });

                    $scope.hasInitialized = false;

                    $scope.$watch('active', function (v) {
                        if (!v || $scope.hasInitialized) return;
                        $scope.hasInitialized = true;
                        try { $scope.dropDown.init(); } catch (e) {};
                    });
                },
                scope: {
                    title: '@',
                    template: '@',
                    callback: '=',
                    icon: '@',
                    data: '='
                },
                templateUrl: '/app/partials/form/utDropdown.html'
            }
        })
    ;
});