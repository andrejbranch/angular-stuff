define(['angular', 'services'], function (angular, services) {

    return services
        .factory('PaintManager', function() {
            return PaintManager = {
                sample: null,

                setSample: function (sample) { this.sample = sample },

                getSample: function () { return this.sample }
            }
        })
    ;
});
