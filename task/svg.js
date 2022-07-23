const { src, dest } = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");


const svg = function () {
  return (
    src("./src/img/svg/*.svg")
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "SVG",
            message: error.message,
          })),
        })
      )
      // minify svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
      // remove all fill, style and stroke declarations in out shapes
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      // cheerio plugin create unnecessary string '&gt;', so replace it.
      .pipe(replace("&gt;", ">"))
      // build svg sprite
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "../sprite.svg",
            },
          },
        })
      )

      .pipe(dest("./dest/img/svg"))
  );
};

module.exports = svg;
