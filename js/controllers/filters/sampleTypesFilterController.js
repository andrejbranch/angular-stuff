define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('SampleTypesFilterController', function SampleTypesFilterController(
            $scope, SampleType, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendSampleType, filteredSampleTypes, filteredSampleTypeNames,
                filteredSampleTypeIds, init, initFilteredSampleTypes, mapper, removeSampleType,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.sampleTypes = SampleType.query({search:$scope.search, not:$stateParams.sampleType, perPage:100}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredSampleTypes = function () {
                filteredSampleTypeIds = $stateParams.sampleType ? $stateParams.sampleType.split(',') : [];
                filteredSampleTypeNames = [];
                filteredSampleTypes = [];

                angular.forEach(filteredSampleTypeIds, function (sampleTypeId) {
                    SampleType.get({sampleTypeId:sampleTypeId}, function (sampleType) {
                        filteredSampleTypes.push(sampleType);
                        filteredSampleTypeNames.push(sampleType.name);
                        $scope.dropDown.title = filteredSampleTypeNames.join(', ');
                        $scope.filteredSampleTypes = filteredSampleTypes;
                    });
                });
            }

            appendSampleType = function (sampleType) {
                $scope.sampleTypes.splice($scope.sampleTypes.indexOf(sampleType), 1);
                $scope.filteredSampleTypes.push(sampleType);
                filteredSampleTypeNames.push(sampleType.name);
            }

            removeSampleType = function (sampleType) {
                $scope.filteredSampleTypes.splice($scope.filteredSampleTypes.indexOf(sampleType), 1);
                $scope.sampleTypes.push(sampleType);
                filteredSampleTypeNames.splice(filteredSampleTypeNames.indexOf(sampleType.name));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredSampleTypeNames.length ? filteredSampleTypeNames.join(', ') : 'Sample Type: All';
            }

            mapper = function (sampleType) {
                return sampleType.id;
            }

            updateState = function () {
                $stateParams.sampleType = $scope.filteredSampleTypes.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load sample types when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredSampleTypes = [];

            $scope.toggleSampleType = function (type, sampleType) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendSampleType(sampleType);

                    if (type === 'remove') removeSampleType(sampleType);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredSampleTypes();
        });
});