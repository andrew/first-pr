var gulp        = require('gulp');
var concat      = require('gulp-concat');
var stylus      = require('gulp-stylus');
var minifyCSS   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');

var paths = {
  js:     ['js/**.js'],
  styles: ['css/**.css'],
};

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('firstpr.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('css', function () {
  gulp.src(paths.styles)
    .pipe(stylus({set:['compress']}))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(concat('firstpr.css'))
    .pipe(gulp.dest('.'));
});

// Continuous build
gulp.task('watch', function() {
  gulp.watch([paths.js],        ['js']);
  gulp.watch([paths.styles],    ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
