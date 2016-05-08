var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var size = require('gulp-size');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */\n\n'
].join('\n');

gulp.task('css', function() {
    gulp.src('./bower_components/normalize-css/normalize.css')
        .pipe(autoprefixer())
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(rename('normalize.css'))
        .pipe(gulp.dest('./css'))
        .pipe(minifyCSS('*'))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(rename('normalize.min.css'))
        .pipe(gulp.dest('./css'));
    gulp.src('./src/stylus/andreas02.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename('andreas02.css'))
        .pipe(gulp.dest('./css'))
        .pipe(minifyCSS('*'))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename('andreas02.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/stylus/*.styl', ['css']);
});

gulp.task('default', ['css']);
