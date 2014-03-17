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
        .controller('ContactGridController',
            function ContactGridController (
                $scope, Contact, LoadingToggler, $stateParams, $state, User,
                utPage, $modal, GridHelper, UserGridSetting
            ) {
                var modalInstance, callBack, initContacts, initUserGridSettings;
                $scope.stateParams = $stateParams;
                $scope.Date = Date;

                var initContacts = function () {
                    LoadingToggler.on();
                    $scope.contacts = Contact.query($stateParams, function (contacts) {
                        LoadingToggler.off();
                        $scope.gridParams = $scope.contacts[0] ? $scope.contacts[0].gridParams : null;
                        utPage.setTitle('Contact Search');
                    });
                }

                var initUserGridSettings = function () {
                    LoadingToggler.on();
                    $scope.userGridSetting = UserGridSetting.get({gridName:'Contact'}, function (userGridSetting) {
                        $scope.showColumns = [];
                        angular.forEach(userGridSetting.columns, function (columnDetails, key) {
                            if (columnDetails.selected) {
                                $scope.showColumns.push(columnDetails.name);
                            }
                        });

                        LoadingToggler.off();
                    });
                }

                GridHelper.createContact = function (contactId) {
                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/contact/form.html',
                        controller: 'ContactModalController',
                        resolve: {
                            contactId: function () {
                                return contactId;
                            },
                            callBack: function () {
                                return function () {
                                    initContacts();
                                };
                            }
                        }
                    });
                }

                GridHelper.initUserGridSettings = initUserGridSettings;

                initContacts();
                initUserGridSettings();
        });
});