module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            build: {
                files: [

                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9021,
                    base: './',
                    keepalive: true
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect']);

};