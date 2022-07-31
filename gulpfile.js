const { src, dest, watch, series, parallel } = require("gulp");
const path = require("./config/path.js")
const browserSync = require("browser-sync");
const del = require("del");



const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const autoPrefixer = require("gulp-autoprefixer");

// Модули
//SVG
const svg = require("./task/svg.js");
const font = require("./task/font.js");
const img = require("./task/img.js");
const fontstyle = require("./task/new_font.js");
const vendor = require("./task/vendor.js");



// JS

const js = function () {
  return src(path.js.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "JS",
          message: error.message,
        })),
      })
    )
    .pipe(fileinclude())
    .pipe(dest(path.js.dest))
    .pipe(browserSync.stream());
};




//SCSS
const scss = function () {
  return src("./src/styles/*.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(autoPrefixer())
    .pipe(gcmq())
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dest/css"))
    .pipe(browserSync.stream());
};

// HTML
const html = function () {
  return src("./src/html/*.html")
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(fileinclude())
    .pipe(dest("./dest/"))
    .pipe(browserSync.stream());
}







const clear = function() {
  return del(["dest/**", "!dest/img", "!dest/favicons", "!dest/fonts"]);
}





const server = (cb) => {
  browserSync.init({
    server: {
      baseDir: "./dest/",
    },
    browser: "Google Chrome Canary",
    notify: false,
  });
  cb();
}


const watcher = (cb) => {

  watch("./src/html/**/*.html", html);
  watch(path.js.watch, js);
  watch("./src/styles/**/*.scss", scss).on("all", browserSync.reload);
  watch("./src/img/svg/*.svg", svg);
  watch(path.img.watch, img);
  watch("dest/**/*.html").on("change", browserSync.reload);
  cb();
}
exports.html = html;
exports.watch = watcher;
exports.clear = clear;
exports.scss = scss;
exports.js = js;
exports.svg = svg;
exports.img = img;
exports.font = font;
exports.fontstyle = fontstyle;
exports.vendor = vendor;


exports.newfont = series(font, fontstyle);

exports.default = series(clear, parallel(html,scss,js,vendor), parallel(watcher, server));