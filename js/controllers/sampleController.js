define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('SampleController', function SampleController(
                $scope, $stateParams, $state, Sample, LoadingToggler, $modal, $sanitize,
                BoxWithSample, $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.sample = Sample.get({sampleId:$stateParams.sampleId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Sample ' + $scope.sample.description);
                });

                LoadingToggler.on();
                $scope.boxesWithSample = BoxWithSample.query({sampleId:$stateParams.sampleId}, function () {
                    LoadingToggler.off();
                });
            }

            $scope.edit = function () {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/sample/form.html',
                    controller: 'SampleModalController',
                    resolve: {
                        sampleId: function () {
                            return $scope.sample.id;
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