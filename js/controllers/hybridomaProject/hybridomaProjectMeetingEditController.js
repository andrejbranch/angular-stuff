define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectMeetingEditController',
            function HybridomaProjectMeetingEditController (
                $scope, $modalInstance, LoadingToggler, callBack, HybridomaProjectMeeting,
                $stateParams, meeting, AttachmentManager
            ) {
                LoadingToggler.on();
                if (meeting) {
                    $scope.meeting = HybridomaProjectMeeting.get({projectId:$stateParams.projectId, meetingId:meeting.id}, function (meeting) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.meeting = new HybridomaProjectMeeting();
                    $scope.meeting.hybridomaProjectId = $stateParams.projectId;
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.meeting.$save({projectId: $stateParams.projectId, meetingId:$scope.meeting.id}, function (meetingResponse) {
                        if (!meetingResponse.errors || !meetingResponse.globalErrors) {
                            
                            AttachmentManager.setObject('HybridomaProjectMeeting')
                            AttachmentManager.setObjectId($scope.meeting.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                $modalInstance.close();
                                callBack($scope.meeting);
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }

                $scope.delete = function () {
                    meeting.projectId = $stateParams.projectId;
                    meeting.$delete({
                        meetingId: meeting.id,
                        projectId: meeting.projectId,
                    }, function () {
                        $modalInstance.close();
                        callBack();
                    });
                }
        });
});