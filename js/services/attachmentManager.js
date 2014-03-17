define(['angular', 'services'], function (angular, services) {

    return services
        .factory('AttachmentManager', function() {
            var AttachmentManager = {
                files: [], utObject: null, utObjectId: null, scope: null, total: 0, callback: null,

                setObject: function (utObject) { this.utObject = utObject },

                setObjectId: function (utObjectId) { this.utObjectId = utObjectId },

                addFile: function (file) { this.files.push(file) },

                getFiles: function () { return this.files },

                reset: function () { this.files = []; this.total = 0 },

                isComplete: function () { return this.files.length == this.total },

                initializeFiles: function (files, renderCallback) {

                    for (var i = 0; i < files.length; i++) {

                        var file = files[i], reader = new FileReader()

                        reader.onload = (function(file) {
                            return function(e) {
                                file.src = e.target.result
                                renderCallback()
                            };
                        })(file)

                        // Read in the image file as a data URL.
                        reader.readAsDataURL(file)

                        this.addFile(file)
                    }

                    return this.files;
                },

                uploadProgress: function (e) {

                    var files = AttachmentManager.getFiles(),
                        progress = Math.round(e.loaded * 100 / e.total)

                    if (e.lengthComputable) {
                        files[e.target.fileKey].progress = progress
                    } else {
                        files[e.target.fileKey].progress = 'unable to compute'
                    }

                    if (progress == 100) AttachmentManager.total++

                    AttachmentManager.scope.$apply();
                },

                uploadComplete: function (e) {
                    if (AttachmentManager.isComplete()) AttachmentManager.callback(); AttachmentManager.reset();
                },

                uploadFailed: function (e) { alert('Woops.. your file upload failed') },

                handleUpload: function (scope, callback) {

                    if (!this.files.length) {
                        callback();
                    }

                    this.scope = scope; this.callback = callback;

                    for (var key in this.files) {
                        var xhr = new XMLHttpRequest()
                        xhr.upload.addEventListener('progress', this.uploadProgress, false)
                        xhr.addEventListener('load', this.uploadComplete, false)
                        xhr.addEventListener('error', this.uploadFailed, false)

                        // allows mapping to specific files to present multiple file progresses
                        xhr.upload.fileKey = key

                        xhr.open('POST', '/api/attachment/' + this.utObject + '/' + this.utObjectId, true)
                        xhr.setRequestHeader('X_FILENAME', this.files[key].name)
                        xhr.send(this.files[key])
                    }
                }
            }

            return AttachmentManager;
        })
    ;
});
