const { src, dest } = require("gulp");
const path = require("../config/path.js");


const vendor = function () {
  return src("./src/vendor/*.*")
  .pipe(dest("./dest/css"));
};



module.exports = vendor;
