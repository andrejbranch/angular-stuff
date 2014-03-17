define(['angular', 'services'], function (angular, services) {
    'use strict';

    return services
        .factory('Box', ['$resource', function($resource) {
            return $resource('/box/:boxId');
        }])
        .factory('Freezer', ['$resource', function($resource) {
            return $resource('/freezer/:freezerId');
        }])
        .factory('LiquidFreezer', ['$resource', function($resource) {
            return $resource('/liquid-freezer/:freezerId');
        }])
        .factory('Division', ['$resource', function($resource) {
            return $resource('/freezer/:freezerId/division');
        }])
        .factory('DivisionBox', ['$resource', function($resource) {
            return $resource('/division/:divisionId/box');
        }])
        .factory('Sample', ['$resource', function($resource) {
            return $resource('/api/sample/:sampleId');
        }])
        .factory('WebText', ['$resource', function($resource) {
            return $resource('/api/webText/:wtfName');
        }])
        .factory('BoxSnapshot', ['$resource', function($resource) {
            return $resource('/api/box-snapshot/:boxId/:snapshot');
        }])
        .factory('BoxWithSample', ['$resource', function($resource) {
            return $resource('/api/box-with-sample/:sampleId');
        }])
        .factory('BoxDetail', ['$resource', function($resource) {
            return $resource('/api/box-detail/:boxId');
        }])
        .factory('User', ['$resource', function($resource) {
            return $resource('/api/user/:userId');
        }])
        .factory('SampleType', ['$resource', function($resource) {
            return $resource('/api/sample-type/:sampleTypeId');
        }])
        .factory('Tag', ['$resource', function($resource) {
            return $resource('/api/tag/:tagId');
        }])
        .factory('Molecule', ['$resource', function($resource) {
            return $resource('/api/molecule/:moleculeId');
        }])
        .factory('Protocol', ['$resource', function($resource) {
            return $resource('/api/protocol/:protocolId');
        }])
        .factory('ProtocolTypeahead', ['$resource', function($resource) {
            return $resource('/api/protocol-typeahead/:protocolId');
        }])
        .factory('Donor', ['$resource', function($resource) {
            return $resource('/api/donor/:donorId');
        }])
        .factory('Target', ['$resource', function($resource) {
            return $resource('/api/target/:targetId');
        }])
        .factory('UserGridSetting', ['$resource', function($resource) {
            return $resource('/api/user-grid-setting/:gridName');
        }])
        .factory('Comment', ['$resource', function($resource) {
            return $resource('/api/comment/:object/:objectId/:commentId');
        }])
        .factory('ObjectAttachment', ['$resource', function($resource) {
            return $resource('/api/attachment/:object/:objectId/:id');
        }])
        .factory('HybridomaProject', ['$resource', function($resource) {
            return $resource('/api/hybridoma-project/:projectId');
        }])
        .factory('Collaborator', ['$resource', function($resource) {
            return $resource('/api/collaborator/:collaboratorId');
        }])
        .factory('Contact', ['$resource', function($resource) {
            return $resource('/api/contact/:contactId');
        }])
        .factory('VimOrder', ['$resource', function($resource) {
            return $resource('/api/vim-order/:vimOrderId');
        }])
        .factory('VimSent', ['$resource', function($resource) {
            return $resource('/api/vim-sent/:vimSentId');
        }])
        .factory('Mta', ['$resource', function($resource) {
            return $resource('/api/mta/:mtaId');
        }])
        .factory('HybridomaProjectExperiment', ['$resource', function($resource) {
            return $resource('/api/hybridoma-project-experiment/:projectId/:experimentId');
        }])
        .factory('HybridomaProjectReagent', ['$resource', function($resource) {
            return $resource('/api/hybridoma-project-reagent/:projectId/:reagentId');
        }])
        .factory('HybridomaProjectMeeting', ['$resource', function($resource) {
            return $resource('/api/hybridoma-project-meeting/:projectId/:meetingId');
        }])
        .factory('SampleTypeahead', ['$resource', function($resource) {
            return $resource('/api/sample-typeahead/:sampleId');
        }])
        .factory('HybridomaProjectVimMta', ['$resource', function($resource) {
            return $resource('/api/project-vim-mta/:projectId/:id');
        }])
    ;
});
