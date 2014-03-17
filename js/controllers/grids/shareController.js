define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ShareController', function ShareController($scope, User, LoadingToggler, $http) {
            $scope.shareLink = window.location.href;

            var selectedUserIds = [], init;

            init = function () {
                LoadingToggler.on();
                $scope.users = User.query({search:$scope.search, not:selectedUserIds.join(',')}, function (user) {
                    LoadingToggler.off();
                });
            }

            $scope.$watch('search', function (v) {
                if (typeof v != 'undefined') {
                    init();
                }
            });

            $scope.selectedUsers = [];

            $scope.toggleUser = function (user, key) {
                // Timeout functions prevents splice happening before utDropdown onClick 
                // (dropdown closes when removing or adding users from list)
                // @see /app/directives/form.js directive utDropDown
                setTimeout(function () {
                    if ($scope.selectedUsers.indexOf(user) > -1) return;
                    $scope.selectedUsers.push(user);

                    $scope.users.splice($scope.users.indexOf(user), 1);
                    selectedUserIds.push(user.u_id);

                    $scope.$apply();
                }, 0);
            }

            $scope.removeUser = function (k) {
                // Timeout functions prevents splice happening before utDropdown onClick 
                // (dropdown closes when removing or adding users from list)
                // @see /app/directives/form.js directive utDropDown
                setTimeout(function () {
                    $scope.selectedUsers.splice(k, 1);
                    selectedUserIds.splice(k, 1);
                    init();
                    $scope.$apply();
                }, 0);
            }

            $scope.share = function (user, link, note) {
                LoadingToggler.on();
                $http.post('/api/share', {userIds:selectedUserIds, link:$scope.shareLink, note:$scope.shareNote}).success(function () {
                    $scope.toggle();
                    LoadingToggler.off();
                });
            }

            $scope.clear =  function () {
                $scope.selectedUsers = [];
            }

            // link dropdown init to this controllers init
            $scope.dropDown.init = init;
        });
});