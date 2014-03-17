define([
    'angular',
    'controllers',
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('ContactGridHeadController',
            function ContactGridHeadController($scope, GridHelper) {
                $scope.createContact = function () {
                    GridHelper.createContact();
                }
        });
});