define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('TargetsFilterController', function TargetsFilterController(
            $scope, Target, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendTarget, filteredTargets, filteredTargetNames,
                filteredTargetIds, init, initFilteredTargets, mapper, removeTarget,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.targets = Target.query({search:$scope.search, not:$stateParams.target, perPage:200}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredTargets = function () {
                filteredTargetIds = $stateParams.target ? $stateParams.target.split(',') : [];
                filteredTargetNames = [];
                filteredTargets = [];

                angular.forEach(filteredTargetIds, function (targetId) {
                    Target.get({targetId:targetId}, function (target) {
                        filteredTargets.push(target);
                        filteredTargetNames.push(target.name);
                        $scope.dropDown.title = filteredTargetNames.join(', ');
                        $scope.filteredTargets = filteredTargets;
                    });
                });
            }

            appendTarget = function (target) {
                $scope.targets.splice($scope.targets.indexOf(target), 1);
                $scope.filteredTargets.push(target);
                filteredTargetNames.push(target.name);
            }

            removeTarget = function (target) {
                $scope.filteredTargets.splice($scope.filteredTargets.indexOf(target), 1);
                $scope.targets.push(target);
                filteredTargetNames.splice(filteredTargetNames.indexOf(target.name));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredTargetNames.length ? filteredTargetNames.join(', ') : 'Target: All';
            }

            mapper = function (target) {
                return target.id;
            }

            updateState = function () {
                $stateParams.target = $scope.filteredTargets.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load targets when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredTargets = [];

            $scope.toggleTarget = function (type, target) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendTarget(target);

                    if (type === 'remove') removeTarget(target);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredTargets();
        });
});