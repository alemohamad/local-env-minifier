'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var del          = require('del');
var gulp         = require('gulp');
var htmlmin      = require('gulp-htmlmin');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var path         = require('path');
var notify       = require('gulp-notify');
var bs           = require('browser-sync').create();
var bourbon      = require('bourbon').includePaths;
var breakpoint   = 'node_modules/breakpoint-sass/stylesheets';

var paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: './dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: './dist/js'
  },
  html: {
    src: 'src/**/*.html',
    dest: './dist'
  },
  assets: {
    src: './src/images/**/*.*',
    dest: './dist/images'
  }
};

// Gulp task to configure the browser sync instance
function browser_sync(done) {
  bs.init({
    server: {
      baseDir: paths.html.dest
    }
  });

  done();
}

// Gulp task to minify CSS files
function css(done) {
  gulp.src('./src/sass/styles.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.', bourbon, breakpoint],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer())
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({
      "title": "Web Dev Kit",
      "message": "Styles task complete",
      "icon": path.join(__dirname, "applogo.png")
    }));

  done();
}

// Gulp task to minify JavaScript files
function js(done) {
  gulp.src('./src/js/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({
      "title": "Web Dev Kit",
      "message": "Scripts task complete",
      "icon": path.join(__dirname, "applogo.png")
    }));

  done();
}

// Gulp task to minify HTML files
function html(done) {
  gulp.src('./src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.reload({stream: true}))
    .pipe(notify({
      "title": "Web Dev Kit",
      "message": "HTML task complete",
      "icon": path.join(__dirname, "applogo.png")
    }));

  done();
}

// Gulp task to copy other assets
function assets(done) {
  gulp.src(paths.assets.src)
    // Output
    .pipe(gulp.dest(paths.assets.dest));

  done();
}

// Clean output directory
function clean(done) {
  del(['dist']);

  done();
}

gulp.task('clean', clean);
gulp.task('css', css);
gulp.task('js', js);
gulp.task('html', html);
gulp.task('assets', assets);

gulp.task('default', gulp.parallel(css, js, html, assets));

function watch_files(done) {
  gulp.watch(paths.styles.src, css);
  gulp.watch(paths.scripts.src, js);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.assets.src, assets);

  done();
}

gulp.task('watch', gulp.parallel('default', watch_files, browser_sync));
