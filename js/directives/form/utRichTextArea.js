define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utRichTextArea', function () {
            return {
                link: function ($scope, element, attrs) {
                    tinymce.init({
                        selector: "textarea.rich",
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table contextmenu paste textcolor"
                        ],
                        toolbar: "\
                              insertfile undo redo | styleselect | bold italic \
                            | alignleft aligncenter alignright alignjustify \
                            | bullist numlist outdent indent | link image | forecolor backcolor",
                        height: 300,
                        width: '93%'
                    });
                }
            }
        })
    ;
});