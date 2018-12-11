const gulp = require("gulp");
const sass = require("gulp-sass");

// Compile Sass
gulp.task("sass", function() {
  return gulp
    .src(["src/scss/*scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"));
});

// Watch
gulp.watch(["src/scss/*.scss"], ["sass"]);

gulp.task("default", ["sass"]);
