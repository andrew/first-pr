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

function generateJs() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('firstpr.js'))
    .pipe(gulp.dest('.'));
}

function generateSass() {
  return gulp.src( paths.sass.src )
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest( paths.sass.build ))
    .pipe(concat('firstpr.css'))
    .pipe(gulp.dest('.'));
}

function build() {
  return gulp.series(generateJs, generateSass)();
}

function watch() {
  gulp.watch(paths.js, generateJs)
  gulp.watch(paths.sass.src, generateSass)
}

gulp.task('js', generateJs);
gulp.task('sass', generateSass);
gulp.task('build', gulp.parallel('js', 'sass'));
gulp.task('watch', watch);
gulp.task('default', gulp.series('build', 'watch'));
