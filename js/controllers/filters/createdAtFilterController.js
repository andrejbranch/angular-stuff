define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('CreatedAtFilterController', function CreatedAtFilterController($scope, $state, $stateParams) {
            var init, deleteParams, updateTitle;

            init = function () {
                $scope.within = $stateParams.within;
                $scope.withinUnits = $stateParams.withinUnits;
                $scope.more = $stateParams.more;
                $scope.moreUnits = $stateParams.moreUnits;

                if ($stateParams.start && $stateParams.end) {
                    $scope.start = new Date($stateParams.start * 1000);
                    $scope.end = new Date($stateParams.end * 1000);
                }
                
                $scope.stateParams = $stateParams;

                if ($scope.within) {
                    $scope.withinLast = true;
                }

                if ($scope.more) {
                    $scope.moreThan = true;
                }

                if ($scope.start) {
                    $scope.betweenDate = true;
                }

                updateTitle();
            }

            deleteParams = function () {
                delete $stateParams.within; 
                delete $stateParams.withinUnits;
                delete $stateParams.more;
                delete $stateParams.moreUnits;
                delete $stateParams.start;
                delete $stateParams.end;
            }

            updateTitle = function () {
                if ($scope.withinLast) {
                    $scope.dropDown.title = 'Created within last ' + $scope.within + ' ' + $scope.withinUnits + 's';
                }

                if ($scope.moreThan) {
                    $scope.dropDown.title = 'Created more than ' + $scope.more + ' ' + $scope.moreUnits + 's ago';
                }

                if ($scope.betweenDate) {
                    $scope.dropDown.title = 'Created between ' + $scope.start + ' and ' + $scope.end;
                }

                if (!$scope.withinLast && !$scope.moreThan && !$scope.betweenDate) {
                    $scope.dropDown.title = 'Created At: All';
                }
            }

            $scope.update = function () {

                deleteParams();

                if ($scope.withinLast) {
                    $stateParams.within = $scope.within;
                    $stateParams.withinUnits = $scope.withinUnits;
                }

                if ($scope.moreThan) {
                    $stateParams.more = $scope.more;
                    $stateParams.moreUnits = $scope.moreUnits;
                }

                if ($scope.betweenDate) {
                    $stateParams.start = $scope.start.getTime() / 1000;
                    $stateParams.end = $scope.end.getTime() / 1000;
                }

                $state.go($state.$current.name, $stateParams);

                updateTitle();
            }

            $scope.toggle = function (checkbox) {
                var c, checkboxes;
                checkboxes = ['withinLast', 'moreThan', 'betweenDate'];
                angular.forEach(checkboxes, function(name, k){
                    if (checkbox == name) {
                        $scope[name] = $scope[name] ? true : false;
                    } else {
                        $scope[name] = false;
                    }
                });
            }


            $scope.clear = function () {

                deleteParams();

                $scope.withinLast = false;
                $scope.moreThan = false;
                $scope.betweenDate = false;

                $state.go($state.$current.name, $stateParams);

                updateTitle();
            }

            // init

            init();
    });
});