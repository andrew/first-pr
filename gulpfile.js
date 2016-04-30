var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
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
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest( paths.sass.build ))
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
