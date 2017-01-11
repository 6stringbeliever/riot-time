var gulp = require('gulp');
var sass = require('gulp-sass');
var rollup = require('rollup-stream');
var riot = require('rollup-plugin-riot');
var source = require('vinyl-source-stream');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

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
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function() {
  return gulp.src('./dev/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('move', function() {
  return gulp.src('./dev/**/*.html')
    .pipe(gulp.dest('./dist'));
});
