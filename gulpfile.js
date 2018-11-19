'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var del          = require('del');
var gulp         = require('gulp');
var htmlmin      = require('gulp-htmlmin');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var path         = require('path');
var notify       = require('gulp-notify');
var bs           = require('browser-sync').create();
var bourbon      = require('bourbon').includePaths;
var breakpoint   = 'node_modules/breakpoint-sass/stylesheets';

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Gulp task to configure the browser sync instance
gulp.task('browser-sync', function() {
  bs.init({
      server: {
          baseDir: "./dist/"
      }
  });
});

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/sass/styles.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.', bourbon, breakpoint],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./dist/css'))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({ title: 'Web Dev Kit', message: 'Styles task complete', icon: path.join(__dirname, 'applogo.png') }))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./dist/js'))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({ title: 'Web Dev Kit', message: 'Scripts task complete', icon: path.join(__dirname, 'applogo.png') }))
});

// Gulp task to minify HTML files
gulp.task('html', function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({ title: 'Web Dev Kit', message: 'HTML task complete', icon: path.join(__dirname, 'applogo.png') }))
});

// Gulp task to copy other assets
gulp.task('assets', function() {
  return gulp.src('./src/images/**/*.*')
    // Output
    .pipe(gulp.dest('./dist/images'))
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean', 'browser-sync'], function () {
  runSequence(
    'styles',
    'scripts',
    'html',
    'assets'
  );
});

// Gulp task to watch changes
gulp.task('watch', ['default'], function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', ['html']);
});
