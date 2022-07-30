// Скопировать в файл gulpfile.js

// FAVICONS
const { src, dest, watch, series, parallel } = require("gulp");
const realFavicon = require("gulp-real-favicon");
const fs = require("fs");
const FAVICON_DATA_FILE = "faviconData.json";
const generate_favicon = function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "./src/img/fav.png",
      dest: "dest/favicons",
      iconsPath: "/favicons",
      //
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: "background",
          backgroundColor: "#333333",
          backgroundRadius: 0.45,
          imageScale: 0.8,
        },
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#2b5797",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "backgroundAndMargin",
          margin: "17%",
          backgroundColor: "#333333",
          themeColor: "#333333",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "silhouette",
          themeColor: "#333333",
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
};

const inject_favicon_markups = function () {
  return src(["./src/html/kit/_favicon.html"])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(dest("./src/html/kit/"));
};

const check_for_favicon_update = function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
};

exports.generate_favicon = generate_favicon;
exports.inject_favicon_markups = inject_favicon_markups;
exports.check_for_favicon_update = check_for_favicon_update;
// END FAVICONS


// const generate_favicon = require("./src/task/gulp-favicon.js");
// const inject_favicon_markups = require("./src/task/gulp-favicon.js");
// const check_for_favicon_update = require("./src/task/gulp-favicon.js");