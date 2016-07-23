'use strict';

var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' );

// Static server
gulp.task( 'browser-sync', function () {
    browserSync( {
        server: {
            baseDir: './src'
        },
        ui: {
            port: 3001
        },
        port: 8080,
        files: './src/**/*',
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        browser: 'google chrome',
        notify: false,
        injectChanges: true
    } );
} );

gulp.task( 'default', [ 'browser-sync' ] );

// var gulp = require( 'gulp' ),
//   sass = require( 'gulp-ruby-sass' ),
//   autoprefixer = require( 'gulp-autoprefixer' ),
//   minifycss = require( 'gulp-minify-css' ),
//   jshint = require( 'gulp-jshint' ),
//   uglify = require( 'gulp-uglify' ),
//   imagemin = require( 'gulp-imagemin' ),
//   rename = require( 'gulp-rename' ),
//   concat = require( 'gulp-concat' ),
//   notify = require( 'gulp-notify' ),
//   cache = require( 'gulp-cache' ),
//   livereload = require( 'gulp-livereload' ),
//   del = require( 'del' );
//
// /***** CREATING TASKS *******/
// /****************************/
//
// // Compile Sass, Autoprefix and minify
// /************************************/
// gulp.task( 'styles', function () {
//   /* the new gulp-ruby-sass API where we define the source file(s) and pass in any options */
//   return sass( 'src/assets/main.scss', {
//       style: 'expanded'
//     } )
//     /* pipe the source file(s) into a plugin */
//     .pipe( autoprefixer( 'last 2 version' ) )
//     //set the destination path
//     .pipe( gulp.dest( 'dist/assets/css' ) )
//     .pipe( rename( {
//       suffix: '.min'
//     } ) )
//     //output the minified version
//     .pipe( minifycss() )
//     .pipe( gulp.dest( 'dist/assets/css' ) )
//     .pipe( notify( {
//       message: 'Styles task complete'
//     } ) );
// } );
//
// // Scripts task to lint, concat and uglify
// /****************************************/
// gulp.task( 'scripts', function () {
//   /* use the gulp.src API to specify our input files */
//   return gulp.src( 'src/**/*.js' )
//     .pipe( jshint( '.jshintrc' ) )
//     //we need to specify a reporter for JSHint
//     .pipe( jshint.reporter( 'default' ) )
//     .pipe( concat( 'main.js' ) )
//     .pipe( gulp.dest( 'dist/assets/js' ) )
//     .pipe( rename( {
//       suffix: '.min'
//     } ) )
//     .pipe( uglify() )
//     .pipe( gulp.dest( 'dist/assets/js' ) )
//     .pipe( notify( {
//       message: 'Scripts task complete'
//     } ) );
// } );
//
// // Compress Images
// /*****************/
// gulp.task( 'images', function () {
//   return gulp.src( 'src/assets/images/**/*' )
//     //(without caching) take any source images and run them through the imagemin plugin
//     // .pipe( imagemin( {
//     //   optimizationlevel: 3,
//     //   progressive: true,
//     //   interlaced: true
//     // } ) )
//     //utilise caching to save re-compressing already compressed images each time this task runs
//     //only new or changed images will be compressed
//     .pipe( cache( imagemin( {
//       optimizationLevel: 5,
//       progressive: true,
//       interlaced: true
//     } ) ) )
//     .pipe( gulp.dest( 'dist/assets/img' ) )
//     .pipe( notify( {
//       message: 'Images task complete'
//     } ) );
// } );
//
// // Clean up!
// /***********/
// /* We don’t need to use a gulp plugin here as we can take advantage of Node modules
// directly within gulp. We use a callback (cb) to ensure the task finishes before exiting. */
// gulp.task( 'clean', function ( cb ) {
//   del( [ 'dist/assets/css', 'dist/assets/js', 'dist/assets/img' ], cb );
// } );
//
// // DEFAULT Task
// /**************/
// //a default task, ran by using $ gulp, to run all three tasks we have created
// /*
// Notice the additional array in gulp.task. This is where we can define task dependencies.
// In this example, the clean task will run before the tasks in gulp.start. Tasks in Gulp
// run concurrently together and have no order in which they’ll finish, so we need to make
// sure the clean task is completed before running additional tasks.
// */
// gulp.task( 'default', [ 'clean' ], function () {
//   gulp.start( 'styles', 'scripts', 'images' );
// } );
//
// // WATCH
// /*******/
// //watch our files and perform the necessary task when they change
// /* specify the files we want to watch via the gulp.watch API and define which task(s)
// to run via the dependency array. We can now run $ gulp watch and any changes to .scss, .js
// or image files */
// gulp.task( 'watch', function () {
//   // Watch .scss files
//   gulp.watch( 'src/assets/**/*.css', [ 'styles' ] );
//
//   // Watch .js files
//   gulp.watch( 'src/**/*.js', [ 'scripts' ] );
//
//   // Watch image files
//   gulp.watch( 'src/assets/images/**/*', [ 'images' ] );
//
//   // Create LiveReload server
//   livereload.listen();
//
//   // Watch any files in dist/, reload on change
//   gulp.watch( [ 'src/assets/**/*.css', 'src/**/*.js' ] ).on( 'change', livereload.changed );
// } );
