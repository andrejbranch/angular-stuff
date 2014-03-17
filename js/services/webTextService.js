define(['angular', 'services', 'utStrings'], function (angular, services, utStrings) {
    'user strict';

    return services
        .factory('WebTextService', ['WebText', 'LoadingToggler', function (webText, loadingToggler) {
            return {
                getText: function(wtfName, $scope) {
                    loadingToggler.on();
                    webText.get({wtfName:wtfName}, function (data) {
                        $scope.text = data.wtf_text ? data.wtf_text : utStrings[wtfName];
                        loadingToggler.off();
                    });
                }
            }
        }]);
});