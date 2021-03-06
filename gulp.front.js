var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var remoteSrc = require('gulp-remote-src');

module.exports = function () {
    gulp.task('front-css', function () {
        gulp.src('www/assets/front/css/theme.less')
            .pipe(less())
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat('front.bundle.css'))
            .pipe(gulp.dest('www/dist'));
    });

    gulp.task('front-css-remote', function () {
        remoteSrc([
            'twitter-bootstrap/3.3.6/css/bootstrap.min.css',
            'magnific-popup.js/1.1.0/magnific-popup.min.css'
        ], {
            base: 'https://cdnjs.cloudflare.com/ajax/libs/'
        })
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat('front.external.css'))
            .pipe(gulp.dest('www/dist/'));
    });

    gulp.task('front-js', function () {
        gulp.src([
                'www/assets/front/js/**/*.js',
                'www/assets/vendor/**/*.js'
            ])
            .pipe(order([
                'nette/nette.forms.js',
                'nette/nette.ajax.js',
                'main.js'
            ]))
            .pipe(uglify())
            .pipe(concat('front.bundle.js'))
            .pipe(gulp.dest('www/dist'));
    });

    gulp.task('front-js-remote', function () {
        remoteSrc([
            'jquery/2.1.4/jquery.min.js',
            'twitter-bootstrap/3.3.6/js/bootstrap.min.js',
            'typeahead.js/0.11.1/typeahead.bundle.min.js',
            'handlebars.js/4.0.3/handlebars.min.js',
            'chosen/1.4.2/chosen.jquery.min.js',
            'canvasjs/1.7.0/canvasjs.min.js',
            'clipboard.js/1.5.5/clipboard.min.js',
            'magnific-popup.js/1.1.0/jquery.magnific-popup.min.js'
        ], {
            base: 'https://cdnjs.cloudflare.com/ajax/libs/'
        })
            .pipe(uglify())
            .pipe(concat('front.external.js'))
            .pipe(gulp.dest('www/dist/'));
    });
};
