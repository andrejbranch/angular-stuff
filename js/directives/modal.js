define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utModal', function ($http, $compile, $injector) {
        	return {
        		restrict: 'E',
        		link: function ($scope, element, attrs) {
        		}
        	}
        })
        .directive('utLoadingIndicator', function (LoadingToggler) {
            return {
                restrict: 'E',
                link: function ($scope, element, attrs) {
                    LoadingToggler.setElement(element);
                },
                template: '<div class="ut-loading"></div>'
            }
        });
});