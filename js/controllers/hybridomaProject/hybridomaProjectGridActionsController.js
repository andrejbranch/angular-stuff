define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectGridActionsController',
            function HybridomaProjectModalController ($scope, $modal, GridHelper) {
                var callBack

                $scope.openEdit = function () {
                    callBack = function () {
                        GridHelper.initProjects()
                    }

                    $modal.open({
                        templateUrl: '/app/partials/hybridomaProject/form.html',
                        controller: 'HybridomaProjectModalController',
                        resolve: {
                            projectId: function () {
                                return $scope.data.id
                            },
                            callBack: function () {
                                return callBack
                            }
                        }
                    });
                }

                $scope.openDelete = function () {
                    callBack = function () {
                        GridHelper.initProjects()
                    }

                    $modal.open({
                        templateUrl: '/app/partials/hybridomaProject/delete.html',
                        controller: 'HybridomaProjectDeleteController',
                        resolve: {
                            project: function () {
                                return $scope.data
                            },
                            callBack: function () {
                                return callBack
                            }
                        }
                    });
                } 
        });
});