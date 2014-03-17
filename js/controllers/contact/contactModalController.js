define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ContactModalController',
            function ContactModalController ($scope, $modalInstance, contactId,
                callBack, Contact, $http, $rootScope, LoadingToggler, AttachmentManager
            ) {
                LoadingToggler.on();

                // are we editing or creating
                if (contactId) {
                    $scope.contact = Contact.get({contactId:contactId}, function (contact) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.contact = new Contact();
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.contact.$save({contactId:$scope.contact.id}, function (contactResponse) {
                        if (!contactResponse.errors || !contactResponse.globalErrors) {

                            // handle file uploads
                            AttachmentManager.setObject('Contact')
                            AttachmentManager.setObjectId($scope.contact.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                $modalInstance.close();
                                callBack();
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }
        });
});