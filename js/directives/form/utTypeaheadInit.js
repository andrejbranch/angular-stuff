define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utTypeaheadInit', function () {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    element.on('click', function () {
                        $scope.init();
                    });
                },
                template: '<span class="ut-typeahead-init">&#9660;</span>'
            }
        })
    ;
});