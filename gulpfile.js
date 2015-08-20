'use strict';

var gulp            = require('gulp'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jeet            = require('jeet'),
    stylus          = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    mocha           = require('gulp-mocha'),
    util            = require('gulp-util'),
    jshint          = require('gulp-jshint');
    

var config = {
  jshint : ['./*.js', './*/*.js']
};

// startup required services to run the app server
gulp.task('mongod', function() {
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
      if(stderr){
        console.log('Mongod[Error]: ' + stderr + ' : ' + stdout);
      } else {
        console.log(stdout);
      }
    });
});


gulp.task('development', function () {
  nodemon({ 
    script: 'app.js',
    ext: 'html js styl',
    ignore: ['ignored.js'],
    env: {"NODE_ENV": "development"}
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('runTests', function () {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ 
            reporter: 'spec',
            timeout:2000,
            // globals: {
            //     should: require('should')
            // }
          }))
        .on('error', util.log) 

        // exit on end
        .once('end', function () {
          process.exit();
        });
});


gulp.task('css', function () {
  // Get one .styl file and render 
  gulp.src('./assets/css/**/*.styl')
    .pipe(stylus(
      {use: [jeet()]}
    ))
    .pipe(gulp.dest('./public/css/build'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(config.jshint, { base: './'})
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
  // gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./assets/css/*.styl', './test/*'], ['css']);
  // gulp.watch(['./**/*.js'], ['runTests']);
});

gulp.task('build', ['css']);
gulp.task('test', ['runTests']);
gulp.task('dev', ['build', 'mongod', 'development', 'watch']);
gulp.task('default',['build']);