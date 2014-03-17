define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('MoleculesFilterController', function MoleculesFilterController(
            $scope, Molecule, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendMolecule, filteredMolecules, filteredMoleculeNames,
                filteredMoleculeIds, init, initFilteredMolecules, mapper, removeMolecule,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.molecules = Molecule.query({search:$scope.search, not:$stateParams.molecule, perPage: 100}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredMolecules = function () {
                filteredMoleculeIds = $stateParams.molecule ? $stateParams.molecule.split(',') : [];
                filteredMoleculeNames = [];
                filteredMolecules = [];

                angular.forEach(filteredMoleculeIds, function (moleculeId) {
                    Molecule.get({moleculeId:moleculeId}, function (molecule) {
                        filteredMolecules.push(molecule);
                        filteredMoleculeNames.push(molecule.name);
                        $scope.dropDown.title = filteredMoleculeNames.join(', ');
                        $scope.filteredMolecules = filteredMolecules;
                    });
                });
            }

            appendMolecule = function (molecule) {
                $scope.molecules.splice($scope.molecules.indexOf(molecule), 1);
                $scope.filteredMolecules.push(molecule);
                filteredMoleculeNames.push(molecule.name);
            }

            removeMolecule = function (molecule) {
                $scope.filteredMolecules.splice($scope.filteredMolecules.indexOf(molecule), 1);
                $scope.molecules.push(molecule);
                filteredMoleculeNames.splice(filteredMoleculeNames.indexOf(molecule.name));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredMoleculeNames.length ? filteredMoleculeNames.join(', ') : 'Molecule: All';
            }

            mapper = function (molecule) {
                return molecule.id;
            }

            updateState = function () {
                $stateParams.molecule = $scope.filteredMolecules.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load molecules when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredMolecules = [];

            $scope.toggleMolecule = function (type, molecule) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendMolecule(molecule);

                    if (type === 'remove') removeMolecule(molecule);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredMolecules();
        });
});