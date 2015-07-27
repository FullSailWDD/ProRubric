'use strict';

var 
    gulp            = require('gulp'), 
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon');
    
var config = {
   sassPath:   './assets/sass',
  jsPath:     './assets/js',
	bowerDir:   './bower_components', 
  imgPath:    './assets/img'
};

var production = process.env.NODE_ENV === 'production';

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js'
          , ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});


  gulp.task('default', ['mongod', 'dev']);
