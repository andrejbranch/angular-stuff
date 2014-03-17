define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectVimMtaController', function HybridomaProjectVimMtaController(
                $scope, LoadingToggler, $modal, HybridomaProjectVimMta, $stateParams, VimMtaUpdateHelper
        ) {
            var init

            init = function () {
                LoadingToggler.on();
                $scope.projectVimMta = HybridomaProjectVimMta.get({projectId:$stateParams.projectId}, function () {
                    LoadingToggler.off()
                });
            }

            init()

            VimMtaUpdateHelper.init = init
        });
});