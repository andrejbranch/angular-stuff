require.config({
    paths: {
        angular: '../../bower_components/angular/angular',
        angularRoute: '../../bower_components/angular-route/angular-route',
        angularMocks: '../../bower_components/angular-mocks/angular-mocks',
        angularResource: '../../bower_components/angular-resource/angular-resource',
        angularUIRouter: '../../bower_components/angular-ui-router/release/angular-ui-router',
        angularAnimate: '../../bower_components/angular-animate/angular-animate',
        angularSanitize: '../../bower_components/angular-sanitize/angular-sanitize',
        text: '../../bower_components/requirejs-text/text',
        uiBootstrapModal: '../../bower_components/angular-ui-bootstrap/src/modal/modal',
        uiBootstrapTypeAhead: '../../bower_components/angular-ui-bootstrap/src/typeahead/typeahead',
        uiPosition: '../../bower_components/angular-ui-bootstrap/src/position/position',
        uiBindHtml: '../../bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml',
        uiBootstrapDatePicker: '../../bower_components/angular-ui-bootstrap/src/datepicker/datepicker',
        uiBootstrapProgressBar: '../../bower_components/angular-ui-bootstrap/src/progressbar/progressbar',
        uiBootstrapTransition: '../../bower_components/angular-ui-bootstrap/src/transition/transition',
        utStrings: 'strings',
        uiBootstrapPopover: '../../bower_components/angular-ui-bootstrap/src/popover/popover',
        uiBootstrapTooltip: '../../bower_components/angular-ui-bootstrap/src/tooltip/tooltip',
        utPage: 'services/utPage',
        utTinyMCE: 'services/utTinyMCE'
    },
    baseUrl: 'app/js',
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularUIRouter': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angularAnimate': ['angular'],
        'angularSanitize': ['angular'],
        'uiBootstrapModal': ['angular'],
        'uiBootstrapTypeAhead': ['angular'],
        'uiPosition': ['angular'],
        'uiBindHtml': ['angular'],
        'uiBootstrapDatePicker': ['angular'],
        'uiBootstrapPopover': ['angular', 'uiBootstrapTooltip'],
        'uiBootstrapTooltip': ['angular'],
        'uiBootstrapProgressBar': ['angular', 'uiBootstrapTransition'],
        'uiBootstrapTransition': ['angular'],
        'utPage' : ['angular', 'services']
    },
    priority: [
        "angular"
    ]
});

// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'angular',
    'app',
    'routes/box',
    'routes/homePage',
    'routes/sample',
    'routes/protocol',
    'routes/hybridomaProject',
    'routes/contact',
    'routes/collaborator'
], function(angular, app, routes) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        $html.addClass('ng-app');
        angular.bootstrap($html, [app['name']]);
    });
});