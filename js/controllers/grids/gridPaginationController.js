define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('GridPaginationController', ['$scope', '$stateParams', '$injector', '$state',
            function GridPaginationController($scope, $stateParams, $injector, $state) {
                var i, params, totalPages, pages = [], start;

                params = $scope.gridParams;

                totalPages = Math.floor((params.total / params.perPage) + 1);

                totalPages = totalPages >= 5 ? 5 : totalPages;

                start = 5 * Math.ceil((parseInt(params.page) / 5)) - 4;

                for (i = start; i <= start + (totalPages - 1); i++) {
                    pages.push({
                        number: i,
                    });
                }

                $scope.pages = pages;
                $scope.nextPage = parseInt(params.page) + 1;

                $scope.turnPage = function (pageNumber) {
                    $stateParams.page = pageNumber;
                    $state.go($state.$current.name, $stateParams);
                }
        }]);
});