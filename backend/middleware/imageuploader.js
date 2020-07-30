const multer = require("multer");
const path = require("path");

var myStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/images"));
  },
});
function filter(req, file, cb) {
  console.log("file is heere>>>", file);
  var mimeType = file.mimetype.split("/")[0];
  if (mimeType === "image") {
    cb(null, true);
  } else {
    req.fileErr = "invalid file format";
    cb(null, false);
  }
}

var upload = multer({
  storage: myStorage,
  fileFilter: filter,
});
module.exports = upload;
