define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectMeetingsController', function HybridomaProjectMeetingsController(
                $scope, LoadingToggler, $modal, HybridomaProjectMeeting, $stateParams
        ) {
            var callBack, init;

            init = function () {
                LoadingToggler.on();
                $scope.meetings = HybridomaProjectMeeting.query({projectId:$stateParams.projectId}, function () {
                    LoadingToggler.off();
                });
            }

            $scope.meetingModal = function (meeting) {

                callBack = function () {
                    init();
                }

                $modal.open({
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

            $scope.deleteMeeting = function (meeting) {
                callBack = function () {
                    $scope.meetings.splice($scope.meetings.indexOf(meeting), 1);
                }

                $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/meeting/deleteMeeting.html',
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

            init();
        });
});