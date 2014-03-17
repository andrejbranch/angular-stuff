define([
    'angular',
    'controllers',
    'controllers/grids/gridPaginationController',
    'controllers/grids/columnSelectionController',
    'controllers/grids/exportController',
    'controllers/grids/shareController'
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('CollaboratorGridController',
            function CollaboratorGridController (
                $scope, Collaborator, LoadingToggler, $stateParams, $state, User,
                utPage, $modal, GridHelper, UserGridSetting
            ) {
                var modalInstance, callBack, initCollaborators, initUserGridSettings;
                $scope.stateParams = $stateParams;
                $scope.Date = Date;

                var initCollaborators = function () {
                    LoadingToggler.on();
                    $scope.collaborators = Collaborator.query($stateParams, function (collaborators) {
                        LoadingToggler.off();
                        $scope.gridParams = $scope.collaborators[0].gridParams;
                        utPage.setTitle('Collaborator Search');
                    });
                }

                var initUserGridSettings = function () {
                    LoadingToggler.on();
                    $scope.userGridSetting = UserGridSetting.get({gridName:'Collaborator'}, function (userGridSetting) {
                        $scope.showColumns = [];
                        angular.forEach(userGridSetting.columns, function (columnDetails, key) {
                            if (columnDetails.selected) {
                                $scope.showColumns.push(columnDetails.name);
                            }
                        });

                        LoadingToggler.off();
                    });
                }

                GridHelper.createCollaborator = function (collaboratorId) {
                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/collaborator/form.html',
                        controller: 'CollaboratorModalController',
                        resolve: {
                            collaboratorId: function () {
                                return collaboratorId;
                            },
                            callBack: function () {
                                return function () {
                                    initCollaborators();
                                };
                            }
                        }
                    });
                }

                GridHelper.initUserGridSettings = initUserGridSettings;

                initCollaborators();
                initUserGridSettings();
        });
});