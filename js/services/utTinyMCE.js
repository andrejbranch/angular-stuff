define(['services'], function (services) {
    'user strict';

    return services
        .factory('utTinyMCE', function () {
            return {
                initialize: function() {
                    // hacky way until we move to angular tinymce
                    setTimeout(function () {
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
                            height: 300
                        });
                    }, 300);
                }
            }
        });
});