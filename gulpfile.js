var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var gulpBowerFiles = require('gulp-bower-files');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');

gulp.task('clean-js',function(){
    return gulp.src('./public/assets/js/*.js')
    .pipe(clean());
});

gulp.task('clean-angular-js',function(){
    return gulp.src('./public/assets/app/*.min.js')
    .pipe(clean());
});

gulp.task('clean-angular-controller',function(){
    return gulp.src('./public/assets/app/controller/**/*.js')
    .pipe(clean());
});

gulp.task('clean-login',function(){
    return gulp.src('./public/login')
    .pipe(clean());
});

gulp.task('clean-css',function(){
    return gulp.src('./public/assets/css/*.min.css')
    .pipe(clean());
});

gulp.task('clean-images',function(){
    return gulp.src('./public/assets/image/*')
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('clean-angular-template',function(){
    return gulp.src('./public/assets/app/template/**/*')
    .pipe(clean());
});


gulp.task('styles',['clean-css'],function(){
        return gulp.src('./assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('css',['clean-css'],function(){
    return gulp.src([
        './assets/css/*.css',
        './assets/css/skins/_all-skins.min.css',
    ])
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('image',['clean-images'],function(){
    return gulp.src([
        './assets/image/**/*',
    ])
    .pipe(gulp.dest('./public/assets/image'));
});

gulp.task('angular-template',['clean-angular-template'],function(){
    return gulp.src([
        './assets/app/template/**/*',
    ])
    .pipe(gulp.dest('./public/assets/app/template'));
});

gulp.task('js',['clean-js'],function(){
    return gulp.src(
        [
            './assets/js/**/*.js'
        ]
    )
    .pipe(plumber())
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('angular-js',['clean-angular-js'],function(){
    return gulp.src(
        [
            './assets/app/*.js',
            './assets/app/directive/*.js',
            './assets/app/filter/*.js',
            './assets/app/service/*.js'
        ]
    )
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    .pipe(gulp.dest('./public/assets/app/'));
});

gulp.task('angular-controller',['clean-angular-controller'],function(){
    return gulp.src(
        [
            './assets/app/controller/**/*.js'
        ]
    )
    .pipe(plumber())
    .pipe(gulp.dest('./public/assets/app/controller'));
});

gulp.task('login',['clean-login'],function(){
    return gulp.src(
        [
            './login/**/*'
        ]
    )
    .pipe(plumber())
    .pipe(gulp.dest('./public/login'));
});

gulp.task('html',function(){
    return gulp.src('index.html')
    .pipe(wiredep({
        fileTypes: {
            html: {
                replace: {
                    js: '<script src="{{filePath}}"></script>'
                }
            }
        }
    }))
    .pipe(inject(gulp.src(
        [
            './public/assets/js/*.js',
            './public/assets/app/*.js',
            './public/assets/app/controller/**/*.js',
            './public/assets/css/*.css'
        ]
        , {read: false}),{ignorePath:'public'}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function(){
    gulp.watch('index.html',['html']);
    gulp.watch(
        [
            './assets/app/*.js',
            './assets/app/directive/*.js',
            './assets/app/filter/*.js',
            './assets/app/service/*.js'
        ]
        ,['angular-js']);
    gulp.watch('./assets/app/controller/**/*.js',['angular-controller']);
    gulp.watch('./assets/app/template/**/*.html',['angular-template']);
    gulp.watch('./assets/scss/*.scss',['styles']);
});

gulp.task("bower-files", function(){
   gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('resource',function(){
    return gulp.src(
        [
            './config.json'
        ]
    )
    .pipe(gulp.dest('./public'));
});


gulp.task('default',['bower-files','styles','resource','image','js','css','login','angular-js','angular-controller','angular-template','html','watch']);