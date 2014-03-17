define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('TagsFilterController', function TagsFilterController(
            $scope, Tag, LoadingToggler, $state, $stateParams
        ) {
            var adjustDropDownTitle, appendTag, filteredTags, filteredTagNames,
                filteredTagIds, init, initFilteredTags, mapper, removeTag,
                updateState
            ;

            // local vars

            init = function () {
                LoadingToggler.on();
                $scope.tags = Tag.query({search:$scope.search, not:$stateParams.tag, perPage:100}, function () {
                   LoadingToggler.off();
                });
            }

            initFilteredTags = function () {
                filteredTagIds = $stateParams.tag ? $stateParams.tag.split(',') : [];
                filteredTagNames = [];
                filteredTags = [];

                angular.forEach(filteredTagIds, function (tagId) {
                    Tag.get({tagId:tagId}, function (tag) {
                        filteredTags.push(tag);
                        filteredTagNames.push(tag.name);
                        $scope.dropDown.title = filteredTagNames.join(', ');
                        $scope.filteredTags = filteredTags;
                    });
                });
            }

            appendTag = function (tag) {
                $scope.tags.splice($scope.tags.indexOf(tag), 1);
                $scope.filteredTags.push(tag);
                filteredTagNames.push(tag.name);
            }

            removeTag = function (tag) {
                $scope.filteredTags.splice($scope.filteredTags.indexOf(tag), 1);
                $scope.tags.push(tag);
                filteredTagNames.splice(filteredTagNames.indexOf(tag.name));
            }

            adjustDropDownTitle = function () {
                $scope.dropDown.title = filteredTagNames.length ? filteredTagNames.join(', ') : 'Tag: All';
            }

            mapper = function (tag) {
                return tag.id;
            }

            updateState = function () {
                $stateParams.tag = $scope.filteredTags.map(mapper).join(',');
                $stateParams.page = 1;
                $state.go($state.$current.name, $stateParams);
            }

            // scope vars

            // load tags when dropdown becomes active
            $scope.dropDown.init = init;

            $scope.filteredTags = [];

            $scope.toggleTag = function (type, tag) {
                // dropdown bind to body click must be executed first
                // @see /app/directives/form/utDropdown.js directive utDropDown
                setTimeout(function () {
                    if (type === 'append') appendTag(tag);

                    if (type === 'remove') removeTag(tag);

                    updateState(); adjustDropDownTitle();
                });
            }

            //init

            initFilteredTags();
        });
});