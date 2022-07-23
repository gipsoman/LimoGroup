// Скопировать в файл gulpfile.js

// FAVICONS
const realFavicon = require("gulp-real-favicon");
const fs = require("fs");
const { default: gulpfile } = require("../../gulpfile");
const FAVICON_DATA_FILE = "faviconData.json";
const generate_favicon = function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "./src/img/fav.png",
      dest: "dest/favicons",
      iconsPath: "/favicons",
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
          design: "raw",
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
          pictureAspect: "noChange",
          themeColor: "#ffffff",
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
          pictureAspect: "blackAndWhite",
          threshold: 52.34375,
          themeColor: "#5bbad5",
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