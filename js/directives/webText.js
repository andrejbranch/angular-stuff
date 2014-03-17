define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utWebText', ['WebTextService', function (webTextService) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    // asyncronysly set the text on the scope
                    webTextService.getText($scope.name, $scope);
                },
                scope: {
                    name: "@"
                },
                template: "<div ng-if='text' class='ut-fade'>{{text}}</div>"
            }
        }]);
});