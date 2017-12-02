const path = require('path'),
      gulp = require('gulp'),
      del = require('del'),
      webpack = require('webpack-stream'),
      inject = require('gulp-inject'),
      server = require('gulp-server-livereload');

const webpackConfig = require('./webpack.config');

const entry = path.resolve(__dirname, 'src'),
      dest = path.resolve(__dirname, 'dist'),
      entryJs = path.resolve(entry, 'app.ts'),
      entryHtml = path.resolve(entry, 'index.html');

gulp.task('default', [
  // 'server',
  'watch',
  'webpack',
  'copy:index',
  'server',
]);

/* Serve */
gulp.task('serve', ['default']);

/* Build */
gulp.task('build', [
  'clean',
  'webpack',
  'copy:index',
]);

gulp.task('clean', () => {
  return del(path.resolve(dest, '**'));
});

gulp.task('webpack', () => {
  return gulp.src(entryJs)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(dest));
});

gulp.task('copy:index', ['webpack'], () => {
  return gulp.src(entryHtml)
      .pipe(inject(gulp.src(path.resolve(dest, '**/*.{js,css}'), {read: false}), {ignorePath: 'dist', addRootSlash: false}))
      .pipe(gulp.dest(dest));
      // .pipe(livereload());
});

gulp.task('watch', ['clean'], () => {
  // livereload.listen({ basePath: dest });
  return gulp.watch(path.resolve(entry, '**/*.{ts,sass,html}'), ['webpack', 'copy:index']);
});

gulp.task('server', ['webpack', 'copy:index'], () => {
  return gulp.src(dest)
      .pipe(server({
        livereload: true,
        open: true
      }));
});

// gulp.task('uri', ['watch'], () => {
//   return gulp.src(__filename)
//       .pipe(open({uri: 'http://www.google.com'}));
// });

// gulp.task('server', (done) => {
//   http.createServer(st({ path: dest, index: 'index.html', cache: false }))
//       .listen(8080, done);
// });
