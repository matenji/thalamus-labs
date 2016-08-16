var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var del = require("del");
var runSequence = require("run-sequence");
var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task("images", function () {
    return gulp.src("app/images/**/*.+(jpg|jpeg|png|svg|gif)")
        .pipe(gulp.dest("dist/images"))
});

gulp.task("useref", function () {
    return gulp.src("app/*.html")
        .pipe(useref())
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cssnano()))
        .pipe(gulp.dest("dist"))
});

gulp.task("fonts", function () {
    return gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
});

gulp.task("clean:dist", function () {
    return del.sync("dist");
});

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
});

gulp.task("watch", ["browserSync", "sass"], function () {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});

gulp.task("sass", function () {
    return gulp.src("app/scss/**/*.scss")
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("build", function (callback) {
    runSequence("clean:dist", ["sass", "useref", "fonts", "images"], callback);
});

gulp.task("default", function (callback) {
    runSequence(["sass", "browserSync", "watch"], callback);
});