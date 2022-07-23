const { src, dest } = require("gulp");
const path = require("../config/path.js");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const newer = require("gulp-newer");

const img = function () {
  return src([path.img.src, "!./src/img/svg"])
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "IMG",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.img.dest))

    .pipe(dest(path.img.dest));
  
};

module.exports = img;
