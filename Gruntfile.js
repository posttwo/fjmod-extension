var archiveName = "build.zip";
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compress: {
          main: {
            options: {
              archive: 'build.zip'
            },
            files: [
              {src: ['**/*', '!**.zip', '!node_modules/**'], dest: '/'}, // includes files in path and its subdirs
            ]
          }
        },
        webstore_upload: {
            "accounts": {
                "default": { //account under this section will be used by default
                    publish: true, //publish item right after uploading. default false
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    refresh_token: process.env.REFRESH_TOKEN
                }
            },
            "extensions": {
                0: {
                    //required
                    appID: process.env.APP_ID,
                    publish: true,
                    //required, we can use dir name and upload most recent zip file
                    zip: archiveName
                }
            }
        }
    }),

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-webstore-upload');
    grunt.registerTask('build', ['compress', 'webstore_upload']);
};
