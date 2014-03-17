define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

	return controllers
        .controller('GridPopController', ['$scope', '$stateParams', '$injector',
            function GridPopController($scope, $stateParams, $injector) {
                var resource;

                $scope.query = function(search, page) {
                    if (!resource) {
                        resource = $injector.get($scope.resource);
                    }

                    resource.query({search:search, page:page}, function (data) {
                        $scope.results = data;
                        $scope.hidden = true;

                        setTimeout(function() {
                            $scope.adjust();
                        }, 0);
                    });
                }
        }]);
});