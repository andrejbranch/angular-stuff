define(['angular', 'services'], function (angular, services) {
    'use strict';

    return services
        .factory('LoadingToggler', ['$rootScope', function($rootScope) {
            return {
                element: null,
                interval: null,
                status: 'off',
                count: 0,
                setElement: function (element) {
                    this.element = element;
                },
                on: function () {
                    var that, x, y;

                    x = 0;
                    y = 0;
                    this.count++;

                    that = this;
                    this.status = 'pending';

                    setTimeout(function () {
                        if (that.status != 'pending') {
                            return;
                        }

                        if (!that.interval) {
                            that.interval = setInterval(function () {
                                y -= 40;
                                that.element.css('background-position', x + 'px ' + y + 'px');
                            }, 100);
                        }

                        that.element.show();
                    }, 100); // this number is the sensitivity of the loading gif
                },
                off: function () {
                    this.element.hide();
                    this.status = 'off';
                    this.count--;

                    if (this.count == 0) {
                        clearInterval(this.interval);
                        this.interval = null;
                    }
                }
            }
        }]);
});
