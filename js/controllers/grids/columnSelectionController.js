define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ColumnSelectionController', function ColumnSelectionController(
                $scope, UserGridSetting, LoadingToggler,GridHelper
            ) {
                LoadingToggler.on();
                $scope.userGridSetting = UserGridSetting.get({gridName:$scope.data.gridName}, function () {
                    LoadingToggler.off(); 
                });
                $scope.toggleColumn = function (columnName) {
                    var k;

                    angular.forEach($scope.userGridSetting.columns, function (columnDetails, key) {
                        if (columnDetails.name == columnName) {
                            columnDetails.selected = columnDetails.selected ? false : true;
                        }
                    });

                    $scope.userGridSetting.$save({gridName:$scope.data.gridName}, function (data) {
                        GridHelper.initUserGridSettings();
                    });
                }
        });
});