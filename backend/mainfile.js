const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const config = require("./configs");

app.use(morgan("dev"));
app.use(cors());

require("./db");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const API_Route = require("./route/api.route");

// var pug = require("pug");
// app.set("view engine", pug);
// app.set("views", path.join(__dirname, "views"));

console.log("firnameeeeeeeeeeeeeeeee", __dirname);
app.use(express.static("uploads/images"));
app.use("/image", express.static(path.join(__dirname, "uploads/images")));
app.use("/api", API_Route);

app.use(function (req, res, next) {
  next({
    msg: "not found",
    status: 404,
  });
});

app.use(function (error, req, res, next) {
  res.status(error.status || 400).json({
    msg: error.msg || error,
    status: error.status || 400,
  });
});

app.listen(config.port, function (err, done) {
  if (err) {
    console.log("error");
  } else {
    console.log("app listen at port " + config.port);
  }
});
