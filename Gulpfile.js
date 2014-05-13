var gulp = require('gulp'),
    express = require('express'),
    lr = require('tiny-lr')(),
    open = require("gulp-open");
 
var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;
 
function startExpress() {
 
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}
 
function startLivereload() {
 
  lr.listen(LIVERELOAD_PORT);
}
 
// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {
 
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task("open", function() {
  var options = {
    url: "http://localhost:" + EXPRESS_PORT
  };
  gulp.src("./index.html")
      .pipe(open("", options));
});
 
gulp.task('default', function () {
 
  startExpress();
  startLivereload();
  gulp.start("open");
  gulp.watch('*.html', notifyLivereload);
});