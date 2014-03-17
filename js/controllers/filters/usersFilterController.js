define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('UsersFilterController', function UsersFilterController(
            $scope, User, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendUser, init, initUsers, initFilteredUsers,
                filteredUserIds, filteredUserNames, filteredUsers, removeUser, updateState
            ;

            // local vars

            init = function () {
                initUsers();
            }

            initUsers = function () {
                LoadingToggler.on();
                $scope.users = User.query({search:$scope.search, not:$stateParams.user}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredUsers = function () {
                filteredUserIds = $stateParams.user ? $stateParams.user.split(',') : [];
                filteredUserNames = [];
                filteredUsers = [];

                angular.forEach(filteredUserIds, function (userId) {
                    User.get({userId:userId}, function (user) {
                        filteredUsers.push(user);
                        filteredUserNames.push(user.fullName);
                        $scope.dropDown.title = filteredUserNames.join(', ');
                        $scope.filteredUsers = filteredUsers;
                    });
                });

                adjustDropDownTitle();
            }

            appendUser = function (user) {
                $scope.users.splice($scope.users.indexOf(user), 1);
                $scope.filteredUsers.push(user);
                $scope.selectedUsers.push(user.u_id);
                filteredUserNames.push(user.fullName);
            }

            removeUser = function (user) {
                $scope.filteredUsers.splice($scope.filteredUsers.indexOf(user), 1);
                $scope.selectedUsers.splice($scope.selectedUsers.indexOf(user.u_id, 1));
                $scope.users.push(user);
                filteredUserNames.splice(filteredUserNames.indexOf(user.fullName));
            }

            updateState = function () {
                $stateParams.user = $scope.selectedUsers.join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredUserNames.length ? filteredUserNames.join(', ') : 'Users: All';
            }

            // scope vars

            // load users when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.selectedUsers = $stateParams.user ? $stateParams.user.split(',') : [];
            $scope.filteredUsers = [];

            $scope.$watch('search', function (v) {
                if (typeof v === 'undefined') return;
                init();
            });

            $scope.toggleUser = function (type, user) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendUser(user);

                    if (type === 'remove') removeUser(user);

                    updateState(); adjustDropDownTitle();
                });
            }

            // init

            initFilteredUsers();
        });
});