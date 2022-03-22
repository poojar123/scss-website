// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
// Importing all the Gulp-related packages we want to use
const sass = require("gulp-sass")(require("sass"));
// const concat = require("gulp-concat");
// const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const replace = require("gulp-replace");
// const terser = require("gulp-terser");
// const browsersync = require("browser-sync").create();

// File paths
const files = {
  scssPath: "assets/scss/**/*.scss",
  jsPath: "assets/js/**/*.js",
};

function scssTask() {
  return src(files.scssPath, { sourcemaps: true }) // set source and turn on sourcemaps
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(dest("assets/css", { sourcemaps: "." })); // put final CSS in dist folder with sourcemap
}

// JS task: concatenates and uglifies JS files to script.js
// function jsTask() {
// 	return src(
// 		[
// 			files.jsPath,
// 			//,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
// 		],
// 		{ sourcemaps: true }
// 	)
// 		.pipe(concat('all.js'))
// 		.pipe(terser())
// 		.pipe(dest('assets/js', { sourcemaps: '.' }));
// }

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}
// Browsersync Tasks
// function browsersyncServe(cb) {
//   browsersync.init({
//     server: {
//       baseDir: ".",
//     },
//   });
//   cb();
// }

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// watch task
function watchTask() {
  // watch("*.html", browsersyncReload);
  watch(
    [files.scssPath],
    parallel(scssTask),
    series(scssTask, browsersyncReload)
  );
}

// default task
exports.default = series(
  parallel(scssTask),
  cacheBustTask,
  // browsersyncServe,
  watchTask
);
