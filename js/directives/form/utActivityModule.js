define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utActivityModule', function (
            LoadingToggler, Comment, $compile, $location, $anchorScroll, $modal
        ) {
            return {
                restrict: 'E',
                scope: { o: '@', oid: '=', comment: '='},
                templateUrl: '/app/partials/form/utActivityModule.html',
                link: function ($scope, element) {
                    var appendComment, compiled, init, el, modalInstance, callBack;

                    init = function () {
                        LoadingToggler.on();
                        $scope.comments = Comment.query({object:$scope.o, objectId:$scope.oid}, function () {
                            LoadingToggler.off();
                        });
                    }

                    appendComment = function () {
                        $scope.newComment = new Comment({
                            userId: utLoggedInUser.u_id,
                            object: $scope.o,
                            objectId: $scope.oid
                        });
                        setTimeout(function () {
                            window.scrollTo(0, $(document).height());
                        });
                    }

                    $scope.$watch('oid', function (v) {
                        if (!v) return; init();
                    });

                    $scope.$on('comment.new', function () {
                        appendComment();
                    });

                    $scope.cancel = function () {
                        delete $scope.newComment;
                    }

                    $scope.save = function () {
                        LoadingToggler.on();
                        $scope.newComment.$save(function (comment) {
                            $scope.cancel();
                            $scope.comments.push(comment);
                            LoadingToggler.off();
                        });
                    }

                    $scope.Date = Date;

                    $scope.editComment = function (c) {
                        callBack = function () {
                            init();
                        }

                        modalInstance = $modal.open({
                            templateUrl: '/app/partials/comment/edit.html',
                            controller: 'CommentModalController',
                            resolve: {
                                comment: function () {
                                    return c;
                                },
                                callBack: function () {
                                    return callBack;
                                }
                            }
                        });
                    }

                    $scope.deleteComment = function (c) {
                        callBack = function () {
                            $scope.comments.splice($scope.comments.indexOf(c), 1);
                        }

                        modalInstance = $modal.open({
                            templateUrl: '/app/partials/comment/delete.html',
                            controller: 'CommentModalController',
                            resolve: {
                                comment: function () {
                                    return c;
                                },
                                callBack: function () {
                                    return callBack;
                                }
                            }
                        });
                    }

                    $scope.canView = function (comment) {
                        return (comment.userId == utLoggedInUser.u_id || utLoggedInUser.groups.indexOf('admin') > -1);
                    }
                }
            }
        })
    ;
});