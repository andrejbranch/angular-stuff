define(['angular', 'services'], function (angular, services) {

    return services
        .factory('Positioner', function() {

            var Positioner = {

                /**
                 * Takes an element and sets the top position of
                 * this element under the relative element
                 * 
                 * @param  {object} el
                 * @param  {object} relEl
                 */
                positionUnder: function (el, relEl) {
                    el.css('top', this.getBotomPosition(relEl))
                },

                /**
                 * Get the bottom position of an element
                 * 
                 * @param  {object} el
                 * @return {int}
                 */
                getBotomPosition: function (el) {
                    return el.get(0).getBoundingClientRect().bottom
                }
            }

            return Positioner;
        })
    ;
});
