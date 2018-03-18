"use strict";

var gulp = require('gulp'),
    path = require('path'),
    rev = require('gulp-rev-append'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    scss = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pump = require('pump'),
    browserSync = require('browser-sync'),
    minify = require('gulp-minify');

var paths = {
    pug: 'src/pug/',
    scss: 'src/scss/',
    js: 'src/js/',
    img: 'src/img/',
    public: 'public/',
    css: 'public/static/css/',
    builtJs: 'public/static/js',
    i: 'public/static/i/'
};

gulp.task('pug', function () {
    return gulp.src(paths.pug + '*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scss', function () {
    return gulp.src(paths.scss + '**/*.scss')
        .pipe(scss({
            outputStyle: 'compressed' // comment to uncompress css
        }))
        .on('error', scss.logError)
        .pipe(prefix(['last 15 versions', '> 1%'], { cascade: true }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src(paths.js + '**/*.js')
        .pipe(gulp.dest(paths.builtJs))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', () =>
    gulp.src(paths.img + '*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest(paths.i))
        .pipe(browserSync.reload({ stream: true }))
);

// added hash query strings
gulp.task('rev', function() {
    gulp.src(paths.public + '*.html')
        .pipe(rev())
        .pipe(gulp.dest(paths.public));
});

// dev server with hot reload web-page
gulp.task('browser-sync', ['scss', 'pug', 'js', 'img'], function () {
    browserSync({
        server: {
            baseDir: paths.public
        },
        notify: false
    });
});

// optimisations
gulp.task('compress', ['pug', 'scss', 'js', 'img'], function (cb) {
    pump([
        gulp.src(paths.js + '*.js'),
        uglify(),
        gulp.dest(paths.builtJs)
    ], cb
);
});

gulp.task('watch-files', ['browser-sync'], function () {
    gulp.watch(paths.scss + '**/*.scss', ['scss', 'rev']);
    gulp.watch(paths.pug + '**/*.pug', ['pug']);
    gulp.watch(paths.js + '**/*.js', ['js', 'rev']);
    gulp.watch(paths.img + '*', ['img']);
});

// gulp main commands
gulp.task('default', ['build']);
gulp.task('build', ['compress']);
gulp.task('dev', ['watch-files']);