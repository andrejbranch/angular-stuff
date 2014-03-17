define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('SamplesFilterController', function SamplesFilterController(
            $scope, Sample, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendSample, filteredSamples, filteredSampleNames,
                filteredSampleIds, init, initFilteredSamples, mapper, removeSample,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.samples = Sample.query({search:$scope.search, perPage:10, not:$stateParams.sample}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredSamples = function () {
                filteredSampleIds = $stateParams.sample ? $stateParams.sample.split(',') : [];
                filteredSampleNames = [];
                filteredSamples = [];

                angular.forEach(filteredSampleIds, function (sampleId) {
                    Sample.get({sampleId:sampleId}, function (sample) {
                        filteredSamples.push(sample);
                        filteredSampleNames.push(sample.description);
                        $scope.dropDown.title = filteredSampleNames.join(', ');
                        $scope.filteredSamples = filteredSamples;
                    });
                });
            }

            appendSample = function (sample) {
                $scope.samples.splice($scope.samples.indexOf(sample), 1);
                $scope.filteredSamples.push(sample);
                filteredSampleNames.push(sample.description);
            }

            removeSample = function (sample) {
                $scope.filteredSamples.splice($scope.filteredSamples.indexOf(sample), 1);
                $scope.samples.push(sample);
                filteredSampleNames.splice(filteredSampleNames.indexOf(sample.description));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredSampleNames.length ? filteredSampleNames.join(', ') : 'Parent: All';
            }

            mapper = function (sample) {
                return sample.id;
            }

            updateState = function () {
                $stateParams.sample = $scope.filteredSamples.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load samples when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredSamples = [];
            $scope.samples = null;

            $scope.$watch('search', function (v) {
                if (typeof v === 'undefined') return;
                init();
            });

            $scope.toggleSample = function (type, sample) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendSample(sample);

                    if (type === 'remove') removeSample(sample);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredSamples();
        });
});