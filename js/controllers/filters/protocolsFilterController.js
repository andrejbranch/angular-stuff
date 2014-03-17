define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ProtocolsFilterController', function ProtocolsFilterController(
            $scope, Protocol, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendProtocol, filteredProtocols, filteredProtocolNames,
                filteredProtocolIds, init, initFilteredProtocols, mapper, removeProtocol,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.protocols = Protocol.query({search:$scope.search, not:$stateParams.protocol}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredProtocols = function () {
                filteredProtocolIds = $stateParams.protocol ? $stateParams.protocol.split(',') : [];
                filteredProtocolNames = [];
                filteredProtocols = [];

                angular.forEach(filteredProtocolIds, function (protocolId) {
                    Protocol.get({protocolId:protocolId}, function (protocol) {
                        filteredProtocols.push(protocol);
                        filteredProtocolNames.push(protocol.protocol);
                        $scope.dropDown.title = filteredProtocolNames.join(', ');
                        $scope.filteredProtocols = filteredProtocols;
                    });
                });
            }

            appendProtocol = function (protocol) {
                $scope.protocols.splice($scope.protocols.indexOf(protocol), 1);
                $scope.filteredProtocols.push(protocol);
                filteredProtocolNames.push(protocol.protocol);
            }

            removeProtocol = function (protocol) {
                $scope.filteredProtocols.splice($scope.filteredProtocols.indexOf(protocol), 1);
                $scope.protocols.push(protocol);
                filteredProtocolNames.splice(filteredProtocolNames.indexOf(protocol.protocol));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredProtocolNames.length ? filteredProtocolNames.join(', ') : 'Protocol: All';
            }

            mapper = function (protocol) {
                return protocol.id;
            }

            updateState = function () {
                $stateParams.protocol = $scope.filteredProtocols.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load protocols when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredProtocols = [];

            $scope.$watch('search', function (v) {
                if (typeof v === 'undefined') return;
                init();
            });

            $scope.toggleProtocol = function (type, protocol) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendProtocol(protocol);

                    if (type === 'remove') removeProtocol(protocol);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredProtocols();
        });
});