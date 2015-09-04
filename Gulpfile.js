var gulp = require('gulp');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    scripts: ['src/js/*.js'],
    css: ['src/css/*.scss']
};

gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(changed('./build'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['watch', 'sass']);