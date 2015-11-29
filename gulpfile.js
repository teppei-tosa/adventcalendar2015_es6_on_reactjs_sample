var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var node = require('node-dev');
var source = require('vinyl-source-stream');
var jest = require('jest-cli');
var babel = require('babel/register');
require('harmonize')();

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

// 自動ブラウザリロード
gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 8080
  });
});

// Javascriptへのビルド
// ES6かつJSXなファイル群をbuild/bundle.jsへ変換する
gulp.task('build', function() {
  browserify({entries: ['./src/app.js']})
    .transform(babelify)
    .bundle()
    .on('error', errorHandler)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));
});

// ローカルサーバーの起動
gulp.task('server', function() {
  node('./server.js', [], []);
});

gulp.task('mocha', function(){
  return gulp.src(['./test/**/*-spec.js'], { read: true })
    .pipe(mocha({ reporter: 'list', compilers: {js: babel}, globals: {env: require('./tools/dom.js')} }))
    .on('error', gutil.log);
})

gulp.task('lint', function(){
  var eslint = require('gulp-eslint');
  return gulp.src('./src/**/*.js')
              .pipe( eslint({ useEslintrc: true }) )
              .pipe( eslint.format() )
              .pipe( eslint.failOnError() )
});

// ファイル監視
// ファイルに更新があったらビルドしてブラウザをリロードする
gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['build', 'lint']);
  gulp.watch('./index.html', ['build']);
  gulp.watch('./server.js', ['build']);
  gulp.watch('./test/**/*-spec.js', ['mocha']);
});

// gulpコマンドで起動したときのデフォルトタスク
gulp.task('default', ['server', 'build', 'watch', 'lint', 'mocha', 'browser-sync']);
