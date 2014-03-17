define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ContactDetailController', function ContactDetailController(
                $scope, $stateParams, $state, Contact, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.contact = Contact.get({contactId:$stateParams.contactId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Contact ' + $scope.contact.name);
                });
            }

            $scope.edit = function () {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/contact/form.html',
                    controller: 'ContactModalController',
                    resolve: {
                        contactId: function () {
                            return $scope.contact.id;
                        },
                        callBack: function () {
                            return callBack;
                        }
                    }
                });
            }

            $scope.comment = function () {
                $rootScope.$broadcast('comment.new');
            }

            init();

            $scope.Date = Date;

            angular.element('body').addClass('edit');
        });
});