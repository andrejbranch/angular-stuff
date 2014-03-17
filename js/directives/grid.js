define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utGridHeader', function ($state, $stateParams) {
            return {
                restrict: 'A',
                link: function ($scope, element, attr) {
                    var sortOrder = $stateParams.sortOrder,
                        sortField = $stateParams.sortField
                    ;

                    if (typeof $scope.allowSort == 'undefined') {
                        $scope.allowSort = true
                    }

                    if ($scope.allowSort == "false") {
                        element.addClass('disabled')
                    }

                    $scope.sortOrder = sortOrder;

                    if (sortField == $scope.sortField) {
                        element.addClass('active');
                    }

                    element.on('click', function () {
                        // sorting is disabled for this column
                        if ($scope.allowSort == "false") return;

                        $stateParams.page = 1;
                        $stateParams.sortField = $scope.sortField;
                        $stateParams.sortOrder = sortOrder == 'ASC' ? 'DESC' : 'ASC';
                        $state.go($state.$current.name, $stateParams);
                    });
                },
                scope: {
                    sortField: '@',
                    label: '@',
                    allowSort: '@'
                },
                transclude: true,
                template: '<span class="{{sortOrder}}">{{label}}</span>'
            }
        });
});
