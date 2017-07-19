var gulp = require('gulp');
var sass = require('gulp-sass');
var rollup = require('rollup-stream');
var riot = require('rollup-plugin-riot');
var source = require('vinyl-source-stream');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var browserSync = require('browser-sync').create();

gulp.task('rollup', function() {
  return rollup({
      format: 'iife',
      entry: './dev/js/app.js',
      dest: './dist/js/app.js',
      plugins: [
        riot(),
        nodeResolve({ jsnext: true }),
        commonjs()
      ]})
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('./dev/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('move', function() {
  return gulp.src('./dev/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('move-serve', ['move'], function() {
  browserSync.reload();
  done();
});

gulp.task('serve', function() {

  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });

  gulp.watch('./dev/**/*.html', ['move-serve']);
  gulp.watch('./dev/css/**/*.scss', ['sass']);
  gulp.watch('./dev/js/**/*.@(js|tag)', ['rollup']);
});

gulp.task('build', ['move', 'rollup', 'sass']);
