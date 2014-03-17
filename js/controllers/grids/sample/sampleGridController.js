define([
    'angular',
    'controllers',
    'controllers/filters/usersFilterController',
    'controllers/filters/sampleTypesFilterController',
    'controllers/filters/tagsFilterController',
    'controllers/filters/moleculesFilterController',
    'controllers/filters/protocolsFilterController',
    'controllers/filters/donorsFilterController',
    'controllers/filters/targetsFilterController',
    'controllers/filters/samplesFilterController',
    'controllers/filters/createdAtFilterController',
    'controllers/grids/gridPaginationController',
    'controllers/grids/columnSelectionController',
    'controllers/grids/exportController',
    'controllers/grids/shareController'
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('SampleGridController',
            function SampleGridController (
                $scope, Sample, LoadingToggler, $stateParams, $state, User,
                UserGridSetting, utPage, $modal,GridHelper 
            ) {
                var modalInstance, callBack, initSamples, initUserGridSettings;
                $scope.stateParams = $stateParams;
                $scope.Date = Date;

                var initSamples = function () {
                    LoadingToggler.on();
                    $scope.samples = Sample.query($stateParams, function (samples) {
                        LoadingToggler.off();
                        $scope.gridParams = $scope.samples[0].gridParams;
                        utPage.setTitle('Sample Search');
                    });
                }

                var initUserGridSettings = function () {
                    LoadingToggler.on();
                    $scope.userGridSetting = UserGridSetting.get({gridName:'Sample'}, function (userGridSetting) {
                        $scope.showColumns = [];
                        angular.forEach(userGridSetting.columns, function (columnDetails, key) {
                            if (columnDetails.selected) {
                                $scope.showColumns.push(columnDetails.name);
                            }
                        });

                        LoadingToggler.off();
                    });
                }

                GridHelper.createSample = function (sampleId) {
                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/sample/form.html',
                        controller: 'SampleModalController',
                        resolve: {
                            sampleId: function () {
                                return sampleId;
                            },
                            callBack: function () {
                                return function () {
                                    initSamples();
                                };
                            }
                        }
                    });
                }

                GridHelper.initUserGridSettings = initUserGridSettings;

                initSamples();
                initUserGridSettings();
        });
});