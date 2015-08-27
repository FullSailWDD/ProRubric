var gulp            = require('gulp'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jeet            = require('jeet'),
    stylus          = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    mocha           = require('gulp-mocha'),
    util            = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    exec            = require('child_process').exec,
    uglify          = require('gulp-uglify'),
    gutil           = require('gulp-util'),
    concat          = require('gulp-concat'),
    ngAnnotate      = require('gulp-ng-annotate'),
    htmlmin         = require('gulp-html-minifier');

var config = {
    jshint: ['./*.js', './*/*.js']
};

gulp.task('clearStart', function () {
    // Ensure mongod is not running
    exec('killall mongod');
});

// startup required services to run the app server
gulp.task('mongod', function () {
    // spawn in a child process mongodb
    child_process.exec('mongod', function (err, stdout, stderr) {
        if (stderr) {
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
            env: {
                "NODE_ENV": "development"
            }
        })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('runTests', function () {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            timeout: 2000
        }))
        .on('error', util.log)

    // exit on end
    .once('end', function () {
        process.exit();
    });
});

//moving views from assets to public and minifying them
gulp.task('htmlCompress', function () {
    gulp.src('./assets/views/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public/views'));
});

gulp.task('css', function () {
    gulp.src('./assets/css/**/*.styl')
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('./public/css/build'))
        .pipe(connect.reload());
    gulp.src('./assets/css/**/*.css')
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('./public/css/build'))
        .pipe(connect.reload());
});

//compiling js files and uglifying them
gulp.task('jsCompress', function () {
    gulp.src('./assets/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/build'))
        .on('error', gutil.log);
});

gulp.task('lint', function () {
    return gulp.src(config.jshint, {
            base: './'
        })
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
    gulp.watch([        
        './assets/**/*', 
        './test/*'
    ],['build']);
});

gulp.task('build', ['htmlCompress', 'css', 'jsCompress']);
gulp.task('test', ['clearStart', 'mongod', 'runTests']);
gulp.task('dev', ['clearStart', 'build', 'mongod', 'watch', 'development']);
gulp.task('default', ['build']);