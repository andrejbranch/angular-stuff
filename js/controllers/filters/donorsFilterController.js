define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('DonorsFilterController', function DonorsFilterController(
            $scope, Donor, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendDonor, filteredDonors, filteredDonorNames,
                filteredDonorIds, init, initFilteredDonors, mapper, removeDonor,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.donors = Donor.query({search:$scope.search, not:$stateParams.donor}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredDonors = function () {
                filteredDonorIds = $stateParams.donor ? $stateParams.donor.split(',') : [];
                filteredDonorNames = [];
                filteredDonors = [];

                angular.forEach(filteredDonorIds, function (donorId) {
                    Donor.get({donorId:donorId}, function (donor) {
                        filteredDonors.push(donor);
                        filteredDonorNames.push(donor.aliases);
                        $scope.dropDown.title = filteredDonorNames.join(', ');
                        $scope.filteredDonors = filteredDonors;
                    });
                });
            }

            appendDonor = function (donor) {
                $scope.donors.splice($scope.donors.indexOf(donor), 1);
                $scope.filteredDonors.push(donor);
                filteredDonorNames.push(donor.aliases);
            }

            removeDonor = function (donor) {
                $scope.filteredDonors.splice($scope.filteredDonors.indexOf(donor), 1);
                $scope.donors.push(donor);
                filteredDonorNames.splice(filteredDonorNames.indexOf(donor.aliases));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredDonorNames.length ? filteredDonorNames.join(', ') : 'Donor: All';
            }

            mapper = function (donor) {
                return donor.id;
            }

            updateState = function () {
                $stateParams.donor = $scope.filteredDonors.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load donors when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredDonors = [];

            $scope.$watch('search', function (v) {
                if (typeof v === 'undefined') return;
                init();
            });

            $scope.toggleDonor = function (type, donor) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendDonor(donor);

                    if (type === 'remove') removeDonor(donor);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredDonors();
        });
});