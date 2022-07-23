const { src, dest } = require("gulp");
const path = require("../config/path.js");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fonter = require("gulp-fonter-unx");
const ttf2woff2 = require("gulp-ttf2woff2");





 const font = (done) => {
    src(path.font.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "FONT",
            message: error.message,
          })),
        })
      )
      .pipe(newer(path.font.dest))

      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      .pipe(dest(path.font.dest))
    src(path.font.src)
      .pipe(ttf2woff2())
      .pipe(dest(path.font.dest))
       done();
 };

module.exports = font;