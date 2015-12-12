var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');

var paths = {
  js:     ['js/**.js'],
  sass: {
    src: ['css/sass/**.scss'],
    build: 'css/'
  }
};

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('firstpr.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  gulp.src( paths.sass.src )
    .pipe(sass())
    .pipe(gulp.dest( paths.sass.build ))
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(concat('firstpr.css'))
    .pipe(gulp.dest('.'));
});

// Continuous build
gulp.task('watch', function() {
  gulp.watch( paths.js,       ['js']);
  gulp.watch( paths.sass.src, ['sass']);
});

gulp.task('build', ['js', 'sass']);
gulp.task('default', ['build', 'watch']);
