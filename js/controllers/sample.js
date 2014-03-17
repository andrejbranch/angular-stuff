define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

	return controllers
        .controller('SampleModalController',
            function SampleModalController (
                $scope,
                $modalInstance,
                sampleId,
                callBack,
                Sample,
                $http,
                $rootScope,
                LoadingToggler,
                utTinyMCE,
                AttachmentManager
            ) {
                LoadingToggler.on();

                // are we editing or creating
                if (sampleId) {
                    $scope.sample = Sample.get({sampleId:sampleId}, function (sample) {
                        if (sample.sample_type_id == 2) { // if hybridoma disable name
                            $scope.sampleDescriptionDisabled = true;
                            $scope.sampleClassificationDisabled = true;
                        }
                        utTinyMCE.initialize();
                        LoadingToggler.off();
                    });
                } else {
                    $scope.sample = new Sample();
                    $scope.sample.User = utLoggedInUser;
                    $scope.sampleDescriptionDisabled = false;
                    LoadingToggler.off();
                    utTinyMCE.initialize();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.classify = function () {
                    setTimeout(function () {
                        LoadingToggler.on();
                        $http.post('/sample/generate-clone-name2', $scope.sample).success(function (data) {
                            LoadingToggler.off();
                            if (typeof data.cloneName != 'undefined') {
                                $scope.sample.description = data.cloneName;
                                $scope.sampleDescriptionDisabled = true;
                            } else {
                                $scope.sampleDescriptionDisabled = false;
                            }
                        });
                    }, 0);
                }

                $scope.save = function () {
                    // need to do this until we move to angular tinymce
                    tinymce.triggerSave();
                    $scope.sample.notes = $('.rich').val();

                    LoadingToggler.on();
                    $scope.sample.$save({sampleId:$scope.sample.id}, function (sampleResponse) {
                        if (!sampleResponse.errors || !sampleResponse.globalErrors) {

                            // handle file uploads
                            AttachmentManager.setObject('Sample')
                            AttachmentManager.setObjectId($scope.sample.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                $modalInstance.close();
                                $rootScope.$broadcast('sample.created', sampleResponse);
                                callBack();
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }

                $scope.presetSelect = function (preset) {
                    $scope.sample.SampleType = preset.SampleType;
                    $scope.sample.Molecule = preset.Molecule;
                    $scope.sample.Tag = preset.Tag;
                    $scope.sample.Target = preset.Target;
                    $scope.sample.Parent = preset.Parent;
                    $scope.classify();
                }
        });
});