define(['angular', 'directives'], function (angular, directives) {

    'use strict';

    return directives
        .directive('utBox', function ($document, $interval) {
            return {
                restrict: 'E',
                link : function ($scope, element, attr) {

                    var boxIntervals = setInterval(function () {
                        $scope.$apply(function () {
                            $scope.updatePositionStatus();
                            $scope.brush.update();
                        })
                    }, 500);

                    element.on('$destroy', function () {
                        clearInterval(boxIntervals);
                    });

                    $scope.positionsHaveChanged = false;

                    // adds opacity to all the samples
                    $scope.deselectAll = function () {
                        angular.forEach($scope.getSampleBoxPositions(), function(sampleBoxPosition, key) {
                            sampleBoxPosition.deselect();
                        });
                    }

                    // refreshes the box to its original selection state
                    $scope.refreshBox = function () {
                        angular.forEach($scope.getSampleBoxPositions(), function(sampleBoxPosition, key) {
                            sampleBoxPosition.refresh();
                        });
                        $scope.selectStarted = false;
                    }

                    $scope.createGhosts = function () {
                        angular.forEach($scope.box.positions, function (row, rowKey) {
                            angular.forEach(row, function (sampleBoxPosition, cellKey) {
                                if (sampleBoxPosition.description) {
                                    sampleBoxPosition.createGhost();
                                }
                            });
                        });
                    }

                    $scope.getSampleBoxPositions = function () {
                        var sampleBoxPositions = [];
                        angular.forEach($scope.box.positions, function (row, rowKey) {
                            angular.forEach(row, function (sampleBoxPosition, cellKey) {
                                sampleBoxPositions.push(sampleBoxPosition);
                            });
                        });

                        return sampleBoxPositions;
                    }

                    // remove all the selected samples when user clicks trashcan
                    $scope.removeSampleBoxPositions = function() {

                        if ($scope.box.isEditableByUser == false) {
                            return;
                        }

                        angular.forEach($scope.getSampleBoxPositions(), function(sampleBoxPosition) {
                            if (sampleBoxPosition.description) {
                                sampleBoxPosition.removeSample();
                            }
                        });

                        $scope.refreshBox();
                    }

                    $scope.updateGradients = function() {
                        var count = 1;
                        $scope.sampleGradients = {};
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition){
                            if (sampleBoxPosition.description && $scope.sampleGradients[sampleBoxPosition.description] === undefined) {
                                $scope.sampleGradients[sampleBoxPosition.description] = count;
                                count = (count == 13) ? 1 : count + 1;
                            }
                        });
                    }
 
                    $scope.enableSelect = function () {
                        $scope.selectEnabled = true;
                    }

                    $scope.disableSelect = function () {
                        $scope.selectEnabled = false;
                    }

                    $scope.setSelectStarted = function (selectStarted) {
                        $scope.selectStarted = selectStarted;
                    }

                    $scope.selectSample = function (sampleId) {
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition) {
                            if (sampleBoxPosition.sampleId == sampleId) {
                                sampleBoxPosition.select();
                            }
                        });
                        $scope.updatePositionStatus();
                    }

                    $scope.clearBoxContents = function () {
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition) {
                            sampleBoxPosition.sampleId = null;
                            sampleBoxPosition.description = null;
                        });
                    }

                    $scope.paint = function () {
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition) {
                            sampleBoxPosition.paint();
                        });
                    }

                    $scope.gridPopCallBack = function (data) {
                        $scope.paint.setSampleFromSearch(data.value, data.placeholder);
                    }

                    $scope.getSampleIds = function () {
                        var sampleIds = [];
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition, index) {
                            sampleIds.push(sampleBoxPosition.sampleId ? sampleBoxPosition.sampleId : null);
                        });

                        return sampleIds;
                    }

                    $scope.updatePositionStatus = function () {
                        $scope.positionsHaveChanged = angular.equals($scope.getSampleIds(), $scope.originalState)
                            ? false
                            : true
                        ;
                    }

                    $scope.updateState = function () {
                        $scope.originalState = $scope.getSampleIds();
                    }

                    $scope.getTotalEmptySelected = function () {
                        var emptySelected = [];
                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition, key) {
                            var isEmptyExists = sampleBoxPosition['isEmpty'] != undefined;
                            if (isEmptyExists && sampleBoxPosition.isEmpty() && sampleBoxPosition.isSelected()) {
                                emptySelected.push(sampleBoxPosition);
                            }
                        });

                        return emptySelected;
                    }

                    $scope.sampleExists = function (sampleId) {
                        return $scope.getSampleIds().indexOf(sampleId) > -1;
                    }

                    $scope.$on('sample.found', function (event, sample) {
                        $scope.paint.setSampleFromSearch(sample.id, sample.description);

                        if (!$scope.sampleExists(sample.id)) {
                           return;
                        }

                        $scope.deselectAll();
                        $scope.selectSample(sample.id);
                    });
                },
                templateUrl: '/app/partials/box/box.html'
            }
        })

        .directive('utSampleBoxPosition', function ($document) {
            return {
                link: function ($scope, element, attr) {

                    var createGhost, isInTopRight, ghostTemplate;

                    element.on('mousedown', function (event) {

                        event.originalEvent.preventDefault();

                        if (!$scope.selectStarted) {
                            $scope.deselectAll();
                        }

                        $scope.enableSelect();
                        $scope.setSelectStarted(true);

                        // enables drag mode
                        // @see utBox directive mouse move bind
                        if (isInTopRight(event) && element.hasClass('full')) {
                            element.hasClass('selected')
                                ? null
                                : $scope.sampleBoxPosition.select()
                            ;

                            $scope.disableSelect();
                            $scope.createGhosts();
                            $scope.enableDragging();

                            return;
                        }

                        element.hasClass('selected')
                            ? $scope.sampleBoxPosition.deselect()
                            : $scope.sampleBoxPosition.select()
                        ;
                    });

                    element.on('mouseenter', function () {
                        if ($scope.selectEnabled) {
                            element.hasClass('selected')
                                ? $scope.sampleBoxPosition.deselect()
                                : $scope.sampleBoxPosition.select()
                            ;
                        }
                    });

                    element.on('mouseup', function (event) {
                        $scope.disableSelect();
                    });

                    element.on('mousemove', function (event) {
                        element.css('cursor', isInTopRight(event) ? 'move' : 'pointer');
                    });

                    element.on('contextmenu', function (event) {
                        if (!$scope.sampleBoxPosition.sampleId) {
                            return; 
                        }

                        $scope.deselectAll();
                        $scope.selectSample($scope.sampleBoxPosition.sampleId);
                        $scope.paint.setSample($scope.sampleBoxPosition, element.attr('class'));
                        $scope.brush.update();

                        $scope.$apply();
                    });

                    $scope.sampleBoxPosition.createGhost = function () {

                        if (!element.hasClass('selected') || !element.hasClass('full')) {
                            return;
                        }

                        $scope.$apply(function() {
                            var left, sampleGhost, top;

                            left = element.offset().left - 1;
                            top = element.offset().top - 55;

                            $scope.ghosts.push({
                                top: top + 'px',
                                left: left + 'px',
                                gradient: element.attr('class'),
                                description: $scope.sampleBoxPosition.description,
                                position: $scope.sampleBoxPosition.position,
                                sampleId: $scope.sampleBoxPosition.sampleId
                            })

                            delete $scope.sampleBoxPosition.description;
                            delete $scope.sampleBoxPosition.sampleId;

                        });

                    }

                    $scope.sampleBoxPosition.setSample = function (sampleId, description) {
                        $scope.$apply(function () {
                            $scope.sampleBoxPosition.sampleId = sampleId;
                            $scope.sampleBoxPosition.description = description;
                            element.removeClass('opaque');
                        });
                        $scope.updateGradients();
                    }


                    $scope.sampleBoxPosition.removeSample = function () {
                        if (element.hasClass('selected')) {
                            $scope.sampleBoxPosition.sampleId = null;
                            $scope.sampleBoxPosition.description = null;
                        }
                        $scope.updateGradients();
                    }

                    $scope.sampleBoxPosition.select = function () {
                        element.addClass('selected').removeClass('opaque');
                    }

                    $scope.sampleBoxPosition.deselect = function () {
                        element.removeClass('selected').addClass('opaque');
                    }

                    $scope.sampleBoxPosition.paint = function () {
                        if (!$scope.sampleBoxPosition.sampleId && element.hasClass('selected')) {
                            $scope.sampleBoxPosition.setSample($scope.paint.sample.id, $scope.paint.sample.description);
                        }
                    }

                    $scope.sampleBoxPosition.refresh = function () {
                        element.removeClass('opaque').removeClass('selected');
                    }

                    $scope.sampleBoxPosition.isSelected = function () {
                        return element.hasClass('selected');
                    }

                    $scope.sampleBoxPosition.isEmpty = function () {
                        return (typeof $scope.sampleBoxPosition.sampleId == 'undefined');
                    }

                    /**
                     * Checks a mouse event to see if the cursor is in the top right
                     * of the sample box position.
                     *
                     * @param jQuery.Event event
                     * @return Boolean
                     */
                    isInTopRight = function (event) {
                        var left, pageX, pageY, top;

                        left = element.offset().left;
                        top = element.offset().top;
                        pageY = event.pageY;
                        pageX = event.pageX;

                        if (pageY <= top + 20) {
                            if (pageX >= left + 70) {
                                return true;
                            }
                        }

                        return false;
                    }
                }
            }
        })

        .directive('utSampleGhost', function ($document) {
            return {
                link: function ($scope, element, attr) {

                    var dropCell, draggingEnabled, getOverlappingPosition, isOverLappingIceBox, mouseX, mouseY;

                    $scope.ghost.drag = function (pageX, pageY, mouseX, mouseY) {
                        $scope.$apply(function() {
                            var currentLeft, currentTop, leftDiff, topDiff;

                            leftDiff = pageX - mouseX;
                            topDiff = pageY - mouseY;

                            $scope.ghost.top = parseInt($scope.ghost.top) + topDiff + 'px';
                            $scope.ghost.left = parseInt($scope.ghost.left) + leftDiff + 'px';
                        })
                    }

                    $scope.ghost.drop = function (e) {
                        var dropPosition = getOverlappingPosition();

                        if (isOverLappingIceBox(e)) {
                            $scope.iceBoxSamples.push({id:$scope.ghost.sampleId, description:$scope.ghost.description});
                            $scope.saveIceBox();

                            return;
                        }

                        if (!dropPosition) {
                            dropPosition = $scope.ghost.position;
                        }

                        angular.forEach($scope.getSampleBoxPositions(), function (sampleBoxPosition) {
                            if (sampleBoxPosition.position == dropPosition) {
                                sampleBoxPosition.setSample($scope.ghost.sampleId, $scope.ghost.description);
                            }
                        });

                        $scope.refreshBox();
                    }


                    getOverlappingPosition = function() {
                        var el, centerLeft, centerTop, height, left, width, overLappingElement, top;

                        el = element.find('td');

                        el.css('z-index', -100);

                        top = el.offset().top - $(window).scrollTop();
                        left = el.offset().left - $(window).scrollLeft();
                        height = el.height();
                        width = el.width();
                        centerLeft = (width / 2) + left;
                        centerTop = (height / 2) + top;

                        overLappingElement = angular.element(document.elementFromPoint(centerLeft, centerTop)).parent('td');

                        return overLappingElement.data('position');
                    }

                    isOverLappingIceBox = function (e) {
                        var dropTarget = $('#ice-box');

                        var mouseX = e.pageX;
                        var mouseY = e.pageY;
                        var width = dropTarget.width();
                        var height = dropTarget.height();
                        var top = dropTarget.offset().top;
                        var left = dropTarget.offset().left;
                        var right = left + width;
                        var bottom = top + height;

                        if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
                            return true;
                        }

                        return false;
                    }
                }
            }
        })

        .directive('utBody', function () {
            return {
                link: function ($scope, element, attrs) {
                    var draggingEnabled, mouseX, mouseY;

                    $scope.ghosts = [];

                    element.on('mousemove', function (event) {

                        if (draggingEnabled) {

                            angular.forEach($scope.ghosts, function (ghost) {
                                ghost.drag(event.pageX, event.pageY, mouseX, mouseY);
                            });

                            mouseX = event.pageX;
                            mouseY = event.pageY;

                        }
                    });

                    element.on('mouseup', function (event) {

                        if (!draggingEnabled || !$scope.ghosts.length) {
                            return;
                        }

                        draggingEnabled = false;

                        angular.forEach($scope.ghosts, function (ghost) {
                            ghost.drop(event);
                        });

                        $scope.$apply(function() {
                            $scope.ghosts = [];
                        });

                    });

                    element.on('mousedown', function (event) {

                        mouseX = event.pageX;
                        mouseY = event.pageY;

                    });

                    $scope.enableDragging = function () {
                        draggingEnabled = true;
                    }


                    $scope.disableDragging = function () {
                        draggingEnabled = false;
                    }
                }
            }
        })
        .directive('utBoxPaint', function($state, $stateParams, PaintManager) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {

                    $scope.paintManager =  PaintManager;

                    $scope.paint.setSample = function (sampleBoxPosition, gradient) {
                        PaintManager.setSample({
                            id: sampleBoxPosition.sampleId,
                            description: sampleBoxPosition.description,
                            gradient: gradient
                        });

                        $state.go('boxView.search', {boxId:$stateParams.boxId, sampleId:sampleBoxPosition.sampleId});
                    }

                    $scope.paint.setSampleFromSearch = function (sampleId, description) {
                        PaintManager.setSample({id: sampleId, description: description})

                        $state.go('boxView.search', {boxId:$stateParams.boxId, sampleId:sampleId});
                    }

                    $scope.$on('sample.created', function (event, sample) {
                        $scope.paint.setSampleFromSearch(sample.id, sample.description);
                    });

                    $scope.$watch('paintManager.sample', function (v) {
                        if (typeof v != 'undefined') {
                            $scope.paint.sample = v;
                        }
                    });
                },
                templateUrl: '/app/partials/box/paint.html'
            };
        })
        .directive('utBoxBrush', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {

                    $scope.brush.update = function () {
                        if ($scope.getTotalEmptySelected().length && $scope.paint.sample) {
                            $scope.brush.activate();
                        } else {
                            $scope.brush.deactivate();
                        }
                    }

                    $scope.brush.activate = function () {
                        $scope.brush.active = true;
                    }

                    $scope.brush.deactivate = function () {
                        $scope.brush.active = false;
                    }

                    element.on('click', function () {
                        $scope.paint();
                    });

                }
            }
        })
        .directive('utBoxSave', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.on('click', function () {
                        if (!element.hasClass('disabled')) {
                            element.addClass('loading');
                            $scope.box.$save({boxId:$scope.box.id, snapshot:null}, function (box) {
                                $scope.updateState();
                                element.removeClass('loading');
                                setTimeout(function () {
                                    $scope.refreshBox();
                                }, 0);
                            });
                        }
                    })
                }
            }
        })
        .directive('utBoxRestore', function ($state) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.on('click', function () {
                        if (!element.hasClass('disabled')) {
                            element.addClass('loading');
                            $scope.box.$save({boxId:$scope.box.id}, function (box) {
                                element.removeClass('loading');
                                $state.go('boxView.freezerList', {boxId:box.id, snapshot:null});
                            });
                        }
                    })
                }
            }
        })
        .directive('utBoxRequest', function ($http) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.on('click', function () {
                        if (!element.hasClass('disabled')) {
                            element.addClass('loading');
                            $http.post('/box/permission-request/' + $scope.box.id).success(function () {
                                element.removeClass('loading');
                                $scope.box.awaitingPermission = true;
                            });
                        }
                    });
                }
            }
        })
        .directive('utSampleToggle', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $scope.$watch('paint.sample', function (v) {
                        if (v) {
                            element.addClass('active').html('Edit ' + v.description);
                        }
                    });

                    element.on('click', function () {
                        if (element.hasClass('active')) {
                            $scope.open($scope.paint.sample.id);
                        }
                    });
                }
            }
        })
        .directive('utIceBoxSample', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    var isInTopRight, createGhost;

                    element.on('mousemove', function (event) {
                        element.css('cursor', isInTopRight(event) ? 'move' : 'pointer');
                    });

                    element.on('mousedown', function (event) {

                        // enables drag mode
                        if (isInTopRight(event)) {
                            $scope.enableDragging();
                            createGhost();
                        }

                    });

                    element.on('mouseup', function (event) {
                        $scope.disableDragging();
                    });

                    createGhost = function () {

                        $scope.$apply(function() {
                            var left, sampleGhost, top;

                            left = element.offset().left - 1;
                            top = element.offset().top - 55;

                            $scope.ghosts.push({
                                top: top + 'px',
                                left: left + 'px',
                                gradient: element.attr('class'),
                                description: $scope.sample.description,
                                sampleId: $scope.sample.id
                            });

                            $scope.iceBoxSamples.splice($scope.iceBoxSamples.indexOf($scope.sample), 1);
                            $scope.saveIceBox();

                        });

                    }

                    /**
                     * Checks a mouse event to see if the cursor is in the top right
                     * of the sample box position.
                     *
                     * @param jQuery.Event event
                     * @return Boolean
                     */
                    isInTopRight = function (event) {
                        var left, pageX, pageY, top;

                        left = element.offset().left;
                        top = element.offset().top;
                        pageY = event.pageY;
                        pageX = event.pageX;

                        if (pageY <= top + 20) {
                            if (pageX >= left + 70) {
                                return true;
                            }
                        }

                        return false;
                    }
                }
            }
        });
});