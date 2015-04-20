module.exports = function(grunt){

    //CONFIGURE
    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: './build', // Where the build version of my node-webkit app is saved
                mac: false, // We don't need mac
                win: true, // We want to build it for win
                linux32: false, // We don't need linux32
                linux64: true // We don't need linux64
            },
            src: ['./**/*'] // Your node-webkit app
        },
      //   uglify: {
      //     my_target: {
      //         files: {
      //           'dest/output.min.js': ['sinput1.js', 'src/input2.js']
      // }
//  }
    });

    //LOAD
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    //TASKS
    grunt.registerTask('default', ['nodewebkit']);
    //grunt.registerTask('ugly', ['uglify']);

};
