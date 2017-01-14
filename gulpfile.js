var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');

var paths = {
  sass: ['./www/app/**/*.scss'],
  javascript: [
    './www/app/app.js',
    './www/app/components/category/category.js',
    './www/app/components/layout/layout.js',
    './www/app/components/user/user.js',
    './www/app/components/session/session.js',
    './www/app/components/deal/deal.js',
    './www/app/components/listing/listing.js',
    './www/app/components/static/static.js',
    './www/app/components/utils/utils.js',
    './www/app/**/*.js'
  ]
};

gulp.task('default', ['sass']);
gulp.task('serve:before', ['sass', 'watch']);
gulp.task('sass', function(done) {
  gulp.src('./www/app/main.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('annotate', function() {
  gulp.src('./www/js/**/*.js')
  .pipe(ngAnnotate({
      add:true
    })
  )
  .pipe(gulp.dest('./www/js/'))
});
gulp.task('index', function(){
  return gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(paths.javascript,
        {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
});
