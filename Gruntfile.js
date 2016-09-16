
accepted
You can create grunt task using grunt-webstore-upload module and run it from Travis

Sample Gruntfile.js:

var archiveName = "buildExt.zip";
module.exports = function(grunt) {

    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),

        webstore_upload: {
            "accounts": {
                "default": { //account under this section will be used by default
                    publish: true, //publish item right after uploading. default false
                    client_id: "xxx",
                    client_secret: "yyy",
                    refresh_token: "zzz"
                }
            },
            "extensions": {
                "myExtensionName": {
                    //required
                    appID: "aaa",
                    publish: true,
                    //required, we can use dir name and upload most recent zip file
                    zip: "build/" + archiveName
                }
            }
        }
    }),

    grunt.loadNpmTasks('grunt-webstore-upload');

    grunt.registerTask('default', ['webstore_upload']);
};
