define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utHelpIcon', function () {
            return {
                restrict: 'E',
                scope: {
                    link: '@'
                },
                template: '<a href="{{link}}" target="_blank"><div class="icon"></div></a>'
            }
        })
    ;
});