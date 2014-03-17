define(['angular', 'controllers', 'utPage'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HomePageController', [ function HomePageController() {}])
        .controller('LabCoreController', ['utPage', function LabCoreController(utPage) {
            utPage.setTitle('Labs and Cores');
        }])
        .controller('utController', [ '$scope', 'utPage', function utController($scope, utPage) {
            $scope.utPage = utPage;
        }])
        .controller('CroweLabController', [ '$scope', 'utPage', function CroweLabController($scope, utPage) {
            utPage.setTitle('Crowelab Home');
            $scope.boxSrefParams = {boxId:322};
        }])
        .controller('AdminCoreController', [ '$scope', 'utPage', function AdminCoreController($scope, utPage) {
            utPage.setTitle('Administration Core');
        }])
        .controller('FlowCoreController', [ '$scope', 'utPage', function FlowCoreController($scope, utPage) {
            utPage.setTitle('Flow Core');
        }])
        .controller('GocoreController', [ '$scope', 'utPage', function GocoreController($scope, utPage) {
            utPage.setTitle('GoCore Home');
            $scope.isGocoreAdmin = window.utLoggedInUser.groups.indexOf('GoCore') > -1;
        }])
        .controller('ImmunologyCoreController', [ '$scope', 'utPage', function ImmunologyCoreController($scope, utPage) {
            utPage.setTitle('Immunology Core Home');
        }])
        .controller('PolackLabController', [ '$scope', 'utPage', function PolackLabController($scope, utPage) {
            utPage.setTitle('Polack Lab Home');
        }])
        .controller('TechCoreController', [ '$scope', 'utPage', function TechCoreController($scope, utPage) {
            utPage.setTitle('Technology Core Home');
        }])
    ;
});