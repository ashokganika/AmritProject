const express = require("express");
const router = express.Router();

const UserModel = require("./../model/user.model");
const map_user_req = require("./../helper/map_user_req");
const passwordHash = require("password-hash");

const fs = require("fs");
const path = require("path");
const upload = require("./../middleware/imageuploader");
const jwt = require("jsonwebtoken");
const config = require("./../configs/index");
function createToken(data) {
  var token = jwt.sign(
    {
      _id: data._id,
      role: data.role,
      username: data.username,
    },
    config.jwt_secret
  );
  return token;
}
router.post("/login", function (req, res, next) {
  UserModel.findOne({
    username: req.body.username,
  })
    .then(function (user) {
      if (user) {
        var isMatched = passwordHash.verify(req.body.password, user.password);
        if (isMatched) {
          var token = createToken(user);
          res.status(200).json({
            user: user,
            token: token,
          });
        } else {
          next({
            msg: "invalid password",
          });
        }
      } else {
        next({
          msg: "invalid username",
        });
      }
    })
    .catch(function (err) {
      next(err);
    });
});

router.post("/register", upload.single("img"), function (req, res, next) {
  console.log("req.file>>>", req.file);
  console.log("req.body>>>", req.body);

  if (req.fileErr) {
    return next({
      msg: req.fileErr,
    });
  }
  // if (req.file) {
  //     var mimeType = req.file.mimetype.split('/')[0];
  //     if (mimeType != 'image') {
  //         fs.unlink(path.join(process.cwd(), 'uploads/images/' + req.file.filename), function (err, done) {
  //             if (err) {
  //                 console.log('error', err);
  //             }
  //             else {
  //                 console.log('file removed');
  //             }
  //         });
  //         return next({
  //             msg: 'invalid file format'
  //         })
  //     }
  const data = req.body;
  if (req.file) {
    data.image = req.file.filename;
  }
  var newUser = new UserModel({});
  var newMappedUser = map_user_req(newUser, data);
  newMappedUser.password = passwordHash.generate(req.body.password);
  newMappedUser.save(function (err, save) {
    if (err) {
      return next(err);
    }
    res.status(200).json(save);
  });
});

module.exports = router;
