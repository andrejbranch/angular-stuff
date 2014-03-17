define([
    'angular',
    'controllers',
    'controllers/filters/createdAtFilterController',
    'controllers/grids/gridPaginationController',
    'controllers/grids/columnSelectionController',
    'controllers/grids/exportController',
    'controllers/grids/shareController'
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('HybridomaProjectGridController',
            function HybridomaProjectGridController (
                $scope, HybridomaProject, LoadingToggler, $stateParams, $state, User,
                utPage, $modal, GridHelper, UserGridSetting
            ) {
                var modalInstance, callBack, initProjects, initUserGridSettings;
                $scope.stateParams = $stateParams;
                $scope.Date = Date;

                var initProjects = function () {
                    LoadingToggler.on();
                    $scope.projects = HybridomaProject.query($stateParams, function (projects) {
                        LoadingToggler.off();
                        $scope.gridParams = $scope.projects[0].gridParams;
                        utPage.setTitle('Hybridoma Project Search');
                    });
                }

                var initUserGridSettings = function () {
                    LoadingToggler.on();
                    $scope.userGridSetting = UserGridSetting.get({gridName:'HybridomaProject'}, function (userGridSetting) {
                        $scope.showColumns = [];
                        angular.forEach(userGridSetting.columns, function (columnDetails, key) {
                            if (columnDetails.selected) {
                                $scope.showColumns.push(columnDetails.name);
                            }
                        });

                        LoadingToggler.off();
                    });
                }

                GridHelper.createProject = function (projectId) {
                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/hybridomaProject/form.html',
                        controller: 'HybridomaProjectModalController',
                        resolve: {
                            projectId: function () {
                                return projectId;
                            },
                            callBack: function () {
                                return function () {
                                    initProjects();
                                };
                            }
                        }
                    });
                }

                GridHelper.initUserGridSettings = initUserGridSettings
                GridHelper.initProjects = initProjects

                initProjects();
                initUserGridSettings();
        });
});