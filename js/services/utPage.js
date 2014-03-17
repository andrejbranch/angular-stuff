define(['angular', 'services'], function (angular, services) {
    'use strict';

    return services
        .factory('utPage', function() {
            var title  = "";
            return {
                title: function () { return title; },
                setTitle: function (newTitle) {
                    setTimeout(function () { title = newTitle; }, 1);
                }
            };
        });
});
