var archiveName = "buildExt.zip";
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webstore_upload: {
            "accounts": {
                "default": { //account under this section will be used by default
                    publish: true, //publish item right after uploading. default false
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET",
                    refresh_token: process.env.REFRESH_TOKEN
                }
            },
            "extensions": {
                "myExtensionName": {
                    //required
                    appID: process.env.APP_ID,
                    publish: true,
                    //required, we can use dir name and upload most recent zip file
                    zip: "build/" + archiveName
                }
            }
        }
    }),

    grunt.loadNpmTasks('grunt-webstore-upload');

    grunt.registerTask('build', ['webstore_upload']);
};
