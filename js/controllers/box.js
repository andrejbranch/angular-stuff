define(['angular', 'controllers', 'utPage'], function (angular, controllers) {
    'use strict';

	return controllers
        .controller('BoxViewController', ['$scope', '$stateParams', 'Box', '$modal', '$http', 'LoadingToggler', 'BoxSnapshot', 'utPage',
            function BoxViewController($scope, $stateParams, Box, $modal, $http, loadingToggler, boxSnapshot, utPage) {
                var intializeBox, intializeIceBox, initializeView;

                intializeBox = function (preventEdit) {
                    loadingToggler.on();

                    if (!$stateParams.snapshot) {
                        var stateParams = {boxId:$stateParams.boxId};
                        $scope.box = Box.get(stateParams, function () {
                            loadingToggler.off();
                            initializeView(preventEdit);
                        });
                    }

                    // we are looing at a box snapshot not the current box
                    if ($stateParams.snapshot) {
                        var stateParams = {boxId:$stateParams.boxId, snapshot:$stateParams.snapshot };
                        $scope.box = boxSnapshot.get(stateParams, function () {
                            $scope.isSnapshot = true;
                            loadingToggler.off();
                            initializeView(preventEdit);
                        });
                    }
                }

                intializeIceBox = function () {
                    $http.get('/api/ice-box').success(function (data) {
                        $scope.iceBoxSamples = data == 'null' ? [] : data; 
                    });
                }

                initializeView = function (preventEdit) {
                    $scope.updateGradients();
                    $scope.originalState = $scope.getSampleIds();
                    utPage.setTitle('Box ' + $scope.box.heading + ' ' + $scope.box.description);

                    if ($stateParams.edit == 1 && !preventEdit) {
                        $scope.openBoxEdit();
                    }
                }

                intializeBox();
                intializeIceBox();

                $scope.brush = {emptySelected:0};
                $scope.paint = {};

                $scope.open = function (sampleId) {
                    loadingToggler.on();

                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/sample/form.html',
                        controller: 'SampleModalController',
                        resolve: {
                            sampleId: function () {
                                return sampleId;
                            },
                            callBack: function () {
                                return intializeBox;
                            }
                        }
                    });
                }

                $scope.iceBoxExpanded = false;
                $scope.freezerNavExpanded = true;

                $scope.openIceBox = function () {
                    $scope.iceBoxExpanded = true;
                    $scope.freezerNavExpanded = false;
                }

                $scope.openFreezerNav = function () {
                    $scope.freezerNavExpanded = true;
                    $scope.iceBoxExpanded = false;
                }

                $scope.saveIceBox = function () {
                    $http.post('/api/ice-box', {samples: $scope.iceBoxSamples});
                }

                $scope.openMoveBox = function () {
                    $modal.open({
                        templateUrl: '/app/partials/box/move.html',
                        controller: 'MoveBoxController',
                        resolve: {
                            boxToMove: function () {
                                return $scope.box;
                            }
                        }
                    });
                }

                $scope.openBoxHistory = function () {
                    $modal.open({
                        templateUrl: '/app/partials/box/history.html',
                        controller: 'BoxHistoryController',
                        resolve: {
                            box: function () {
                                return $scope.box;
                            }
                        }
                    });
                }

                $scope.openBoxEdit = function () {

                    if ($scope.box.isEditableByUser == false) {
                        return;
                    }

                    $modal.open({
                        templateUrl: '/app/partials/box/boxEdit.html',
                        controller: 'BoxEditModalController',
                        resolve: {
                            boxToEdit: function () {
                                return $scope.box;
                            },
                            callBack: function () {
                                return intializeBox;
                            }
                        }
                    });
                }
        }])
        .controller('FreezerListController', ['$scope', '$stateParams', 'Freezer', 'LoadingToggler',
            function FreezerListController($scope, $stateParams, Freezer, loadingToggler) {
                loadingToggler.on();
                $scope.freezers = Freezer.query(function () {
                    loadingToggler.off();
                });
        }])
        .controller('DivisionListController', ['$scope', '$stateParams', 'Division', 'LoadingToggler',
            function DivisionListController($scope, $stateParams, Division, loadingToggler) {
                loadingToggler.on();
                $scope.divisions = Division.query({freezerId:$stateParams.freezerId}, function () {
                    loadingToggler.off();
                });
        }])
        .controller('BoxListController', ['$scope', '$stateParams', 'DivisionBox', 'LoadingToggler',
            function BoxListController($scope, $stateParams, DivisionBox, loadingToggler) {
                loadingToggler.on();
                $scope.divisionBoxes = DivisionBox.query({divisionId:$stateParams.divisionId}, function () {
                    loadingToggler.off();
                });
        }])
        .controller('MoveBoxController', ['$scope', '$stateParams', 'LoadingToggler', 'Freezer', 'Division', 'DivisionBox', 'boxToMove', '$http', '$state', '$modalInstance',
            function MoveBoxController($scope, $stateParams, loadingToggler, freezer, division, divisionBox, boxToMove, $http, $state, $modalInstance) {
                var views;

                views = ['freezerList', 'divisionList', 'boxList', 'success'];

                $scope.freezers = freezer.query(function () {
                    loadingToggler.off();
                    $scope.toggleView('freezerList');
                });

                $scope.selectFreezer = function (freezer) {
                    loadingToggler.on();
                    $scope.selectedFreezer = freezer;
                    $scope.divisions = division.query({freezerId:freezer.id}, function () {
                        loadingToggler.off();
                        $scope.toggleView('divisionList');
                    });
                }

                $scope.selectDivision = function (division) {
                    loadingToggler.on(); 
                    $scope.selectedDivision = division;
                    $scope.divisionBoxes = divisionBox.query({divisionId:division.id}, function () {
                        loadingToggler.off();
                        $scope.toggleView('boxList');
                    });
                }

                $scope.selectBox = function (box) {
                    $scope.boxToMove = boxToMove;
                    $scope.moveToBox = box;
                    $scope.toggleView('success');
                }

                $scope.toggleView = function (viewToToggle) {
                    angular.forEach(views, function (view, key) {
                        $scope[view + 'Show'] = false;
                    });

                    $scope[viewToToggle + 'Show'] = true;
                }

                $scope.moveBox = function (boxToMove, moveToBox) {
                    loadingToggler.on();
                    $http.post('/box-move-contents', {boxToMove: boxToMove, moveToBox: moveToBox}).success(function (data) {
                        loadingToggler.off();
                        $state.go('boxView.freezerList', {boxId:moveToBox.id});
                        $modalInstance.close();
                    });
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }
        }])
        .controller('BoxHistoryController', ['$scope', '$state', 'LoadingToggler', '$modalInstance', 'BoxSnapshot', 'box',
            function BoxHistoryController($scope, $state, loadingToggler, $modalInstance, boxSnapshot, box) {
                loadingToggler.on();

                $scope.box = box;

                $scope.boxSnapshots = boxSnapshot.query({boxId:box.id}, function () {
                    loadingToggler.off();
                });

                $scope.viewSnapshot = function (createdAt) {
                    $state.go('boxView.freezerList', {boxId:box.id, snapshot:createdAt});
                    $scope.cancel();
                }

                $scope.currentState = function () {
                    $state.go('boxView.freezerList', {boxId:box.id, snapshot:null});
                    $scope.cancel();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }
        }])
        .controller('BoxSampleFindController', ['$scope', '$state', '$stateParams', 'LoadingToggler', 'Box', 'BoxWithSample', 'Sample', '$rootScope', 'PaintManager',
            function BoxSampleFindController($scope, $state, $stateParams, loadingToggler, box, boxWithSample, sample, $rootScope, PaintManager) {
                $scope.sampleId = $stateParams.sampleId;

                $scope.box = box.get({boxId:$stateParams.boxId});
                $scope.sample = sample.get({sampleId:$scope.sampleId}, function () {
                    $rootScope.$broadcast('sample.found', $scope.sample);
                    PaintManager.setSample({
                        id: $scope.sample.id,
                        description: $scope.sample.description,
                    });
                });

                loadingToggler.on();
                $scope.boxesWithSample = boxWithSample.query({sampleId:$scope.sampleId}, function () {
                    loadingToggler.off();
                });
        }])
        .controller('BoxEditModalController', function BoxEditModalController($scope, boxToEdit, $modalInstance, BoxDetail, LoadingToggler, callBack, $stateParams) {
            var awaitingPermission = [], editableBy = [];

            $scope.boxDetail = BoxDetail.get({boxId:boxToEdit.id});

            $scope.cancel = function () {
                $modalInstance.close();
            }

            $scope.removeUserThatCanEdit = function (k, userId) {
                if (utLoggedInUser.u_id == userId) {
                    alert("Sorry, you can't deny yourself permission");

                    return;
                }

                //remove user from usersThatCanEdit
                $scope.boxDetail.usersThatCanEdit.splice(k, 1);
            }

            $scope.grantUserPermission = function (k, user) {
                if (editableBy.indexOf(user.u_id) > -1) {
                    alert("You cannot add the same user more than once.");

                    return;
                }

                // push user to usersThatCanEdit and remove from awaitingUsers for view change
                $scope.boxDetail.usersThatCanEdit.push(user);
                $scope.boxDetail.awaitingUsers.splice(k, 1);
            }

            $scope.denyUserPermission = function (k, userId) {
                // remove user from awaiting users
                $scope.boxDetail.awaitingUsers.splice(k, 1);
            }

            $scope.addEditableByUser = function (user) {
                var k;

                // prevent duplicates
                if (editableBy.indexOf(user.u_id) > -1) {
                    alert("You cannot add the same user more than once.");

                    return;
                }

                // if this user is already awaiting permission just execute grantUserPermission
                if ((k = awaitingPermission.indexOf(user.u_id)) > -1) {
                    $scope.grantUserPermission(k, user);

                    return;
                }

                //push user to userThatCanEdit
                $scope.boxDetail.usersThatCanEdit.push(user);
            }

            $scope.save = function () {
                angular.forEach($scope.boxDetail.awaitingUsers, function (awaitingUser) {
                    awaitingPermission.push(awaitingUser.u_id);
                });

                angular.forEach($scope.boxDetail.usersThatCanEdit, function (userThatCanEdit) {
                    editableBy.push(userThatCanEdit.u_id);
                });

                $scope.boxDetail.editable_by = editableBy.join(',');
                $scope.boxDetail.awaiting_permission = awaitingPermission.join(',');

                LoadingToggler.on();
                $scope.boxDetail.$save({boxId:$scope.boxDetail.id}, function (boxResponse) {
                    LoadingToggler.off();
                    if (!boxResponse.errors || !boxResponse.globalErrors) {
                        $modalInstance.close();
                        callBack(true);
                    }
                });
            }
        });
});