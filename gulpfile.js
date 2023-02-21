'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
const merge = require("merge-stream");

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// copy build
gulp.task('copy-build-resources', function () {
    return merge([
        gulp.src('./img/*')
        .pipe(gulp.dest('./build/img')),
        gulp.src('./css/*')
        .pipe(gulp.dest('./build/css')),
        gulp.src('./fonts/*')
        .pipe(gulp.dest('./build/fonts')),
        gulp.src('./js/*')
        .pipe(gulp.dest('./build/js')),
        gulp.src('./index.html')
        .pipe(gulp.dest('./build')),
        gulp.src('./android-chrome-192x192.png').pipe(gulp.dest('./build')),
        gulp.src('./android-chrome-512x512.png').pipe(gulp.dest('./build')),
        gulp.src('./apple-touch-icon.png').pipe(gulp.dest('./build')),
        gulp.src('./browserconfig.xml').pipe(gulp.dest('./build')),
        gulp.src('./favicon-16x16.png').pipe(gulp.dest('./build')),
        gulp.src('./favicon-32x32.png').pipe(gulp.dest('./build')),
        gulp.src('./favicon.ico').pipe(gulp.dest('./build')),
        gulp.src('./manifest.json').pipe(gulp.dest('./build')),
        gulp.src('./mstile-150x150.png').pipe(gulp.dest('./build')),
        gulp.src('./safari-pinned-tab.svg').pipe(gulp.dest('./build')),
    ])
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));