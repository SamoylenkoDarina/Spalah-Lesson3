'use strict';

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    sourcemaps     = require('gulp-sourcemaps'),
    browserSync    = require('browser-sync').create(),
    imagemin       = require('gulp-imagemin'),
    fontmin        = require('gulp-fontmin'),
    watch          = require('gulp-watch'),
    autoprefixer   = require('gulp-autoprefixer'),
    gulpFilter     = require('gulp-filter'),
    flatten        = require('gulp-flatten'),
    // uglify         = require('gulp-uglifyjs'),
    mainBowerFiles = require('gulp-main-bower-files');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
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

gulp.task('image:watch', ['image:build'], function(){
    return watch([
        './frontend/images/**/*.jpg',
        './frontend/images/**/*.png',
        './frontend/images/**/*.svg',
        './frontend/images/**/*.gif'], function () {
        gulp.src([
            './frontend/images/**/*.jpg',
            './frontend/images/**/*.png',
            './frontend/images/**/*.svg',
            './frontend/images/**/*.gif'
        ])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('image:build', function(){
    gulp.src([
        './frontend/images/**/*.jpg',
        './frontend/images/**/*.png',
        './frontend/images/**/*.svg',
        './frontend/images/**/*.gif'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
});

gulp.task('javascripts:watch', ['javascripts:build'], function(){
    return watch('./frontend/js/**/*.js', function () {
        gulp.src('./frontend/js/**/*.js')
            // .pipe(uglify())
            .pipe(gulp.dest('./public/js'));
    });
});

gulp.task('javascripts:build', function(){
    gulp.src('./frontend/js/**/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(filterJS)
        .pipe(flatten())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('fonts', function(){
    return gulp.src('./frontend/fonts/**/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(filterJS)
        .pipe(flatten())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', [
    'browser-sync', 
    'sass', 
    'image:watch',
    'main-bower-files',
    'javascripts:build',
    'javascripts:watch',
    'fonts']);
