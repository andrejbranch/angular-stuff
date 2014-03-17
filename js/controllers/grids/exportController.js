define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ExportController', function ExportController ($scope, $stateParams) {
            $scope.csvPost = function (type, gridName) {
                var hash = window.location.hash,
                    questionPosition = hash.indexOf("?"),
                    params = hash.substring(questionPosition)
                ;

                window.location = '/export/' + type + '/' + gridName + params;

                $scope.toggle();
            }
        })
    ;
});