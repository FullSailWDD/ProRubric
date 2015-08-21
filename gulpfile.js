var gulp            = require('gulp'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jeet            = require('jeet'),
    stylus          = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    mocha           = require('gulp-mocha'),
    util            = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    exec            = require('child_process').exec;

var config = {
  jshint : ['./*.js', './*/*.js']
};

gulp.task('clearStart', function(){
    // Ensure mongod is not running
    exec('killall mongod');
});

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

gulp.task('js', function () {
    // Get JS files and Move
    gulp.src('./assets/js/*.js')
        .pipe(gulp.dest('./public/js/build'))
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

gulp.task('build', ['css', 'js']);
gulp.task('test', ['clearStart', 'mongod', 'runTests']);
gulp.task('dev', ['clearStart', 'build', 'mongod', 'watch', 'development']);
gulp.task('default',['build']);