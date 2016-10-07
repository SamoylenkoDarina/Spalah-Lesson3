'use strict';
 
var gulp = require('gulp');
var sass = require ('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('test', ['sass'], function() { console.log('Sass compilation has been completed') });
 
gulp.task('sass:watch', function () {
    gulp.watch('./frontend/stylesheets/**/*.scss', ['test']);
});