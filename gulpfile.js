'use strict';

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    browserSync     = require('browser-sync'),
    imagemin        = require('gulp-imagemin'),
    watch           = require('gulp-watch'),
    autoprefixer    = require('gulp-autoprefixer'),    
    gulpFilter      = require('gulp-filter'),
    mainBowerFiles  = require('gulp-main-bower-files'),
    flatten         = require('gulp-flatten');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(browserSync.stream())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('image:build', function(){
    return watch(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'], function () {
        gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('fonts', function(){
    return gulp.src(['./frontend/fonts/**/*.eot', './frontend/fonts/**/*.ttf', './frontend/fonts/**/*.otf', './frontend/fonts/**/*.svg', './frontend/fonts/**/*.woff'])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(filterJS)
        .pipe(flatten())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['browser-sync', 'sass', 'image:build', 'main-bower-files', 'fonts']);
