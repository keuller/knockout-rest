var gulp = require('gulp');

// plugins
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// jslint task
gulp.task('lint', function() {
   return gulp.src('js/*.js')
              .pipe(jshint())
              .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
   return gulp.src('js/knockout-rest.js')
              .pipe(rename('knockout-rest.min.js'))
              .pipe(uglify())
              .pipe(gulp.dest('dist'));
});

gulp.task('build-amd', function() {
   return gulp.src('js/knockout-rest.amd.js')
              .pipe(rename('knockout-rest.amd.min.js'))
              .pipe(uglify())
              .pipe(gulp.dest('dist'));
});


gulp.task('default', ['lint', 'build', 'build-amd']);
