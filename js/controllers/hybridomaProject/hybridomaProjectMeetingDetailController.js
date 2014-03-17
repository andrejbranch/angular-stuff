define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectMeetingDetailController', function HybridomaProjectMeetingDetailController(
                $scope, $stateParams, $state, HybridomaProjectMeeting, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.meeting = HybridomaProjectMeeting.get({projectId:$stateParams.projectId, meetingId:$stateParams.meetingId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Meeting ' + $scope.meeting.id);
                });
            }

            $scope.edit = function (meeting) {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/meeting/form.html',
                    controller: 'HybridomaProjectMeetingEditController',
                    resolve: {
                        meeting: function () {
                            return meeting;
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