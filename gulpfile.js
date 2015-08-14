'use strict';

var 
    gulp            = require('gulp'), 
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jeet            = require('jeet'),
    stylus          = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    mocha           = require('gulp-mocha'),
    util            = require('gulp-util');
    

// include, if you want to work with sourcemaps 
var sourcemaps = require('gulp-sourcemaps');

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js styl'
          , ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
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
});



// Get one .styl file and render 
gulp.task('stylus', function () {
  gulp.src('./assets/css/main.styl')
    .pipe(stylus(
      {use: [jeet()]}
    ))
    .pipe(gulp.dest('./public/css/build'))
    .pipe(connect.reload());
});
 

gulp.task('watch', function () {
  // gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./assets/css/*.styl', './test/*'], ['stylus']);
});



gulp.task('test', ['runTests']);
  gulp.task('default', ['mongod', 'dev', 'stylus', 'watch']);