const ProductQuery = require("./product.query");

function get(req, res, next) {
  //     const conditin ={};
  // if(req.loggedInUser.role != 1){
  //     condition.vender=req.loggedInUser._id;
  // }
  ProductQuery.find({})
    .then(function (data) {
      res.status(200).json(data);
      console.log("product get>>", data);
    })
    .catch(function (err) {
      next(err);
    });
}

function post(req, res, next) {
  console.log("req.body", req.body);
  console.log("req.file...........................>>", req.file);

  console.log("req.files>>", req.files);
  const data = req.body;
  // data.vender=req.loggedInUser._id;
  // if(req.fileErr){
  //     return next({
  //         msg:"invalid file format"
  //     })
  // }
  // if(req.file){
  //     data.images=[req.file.filename]
  // }

  if (req.file) {
    data.images = req.file.filename;
  }
  ProductQuery.insert(data)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}
function getById(req, res, next) {
  var condition = { _id: req.params.id };
  ProductQuery.find(condition)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function search(req, res, next) {
  const condition = {};
  const data = req.body;
  const searchCondition = ProductQuery.map_product_req(condition, data);
  console.log("search >>", searchCondition);
  if (req.body.minPrice) {
    searchCondition.price = {
      $gte: req.body.minPrice,
    };

    if (req.body.maxPrice) {
      searchCondition.price = {
        $lte: req.body.maxPrice,
      };
    }
    if (req.body.minPrice && req.body.maxPrice) {
      searchCondition.price = {
        $gte: req.body.minPrice,
        $lte: req.body.maxPrice,
      };
    }
    if (req.body.fromDate && req.body.toDate) {
      const fromDate = new Date(req.body.fromDate).setHours(0, 0, 0, 0);
      const toDate = new Date(req.body.toDate).setHours(23, 59, 59, 999);
      searchCondition.ceatedAt = {
        $lte: new Date(toDate),
        $gte: new Date(fromDate),
      };
    }
  }

  console.log("product query found at here .................");
  ProductQuery.find(searchCondition, req.query)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function put(req, res, next) {
  const data = req.body;
  data.vender = req.loggedInUser._id;
  if (req.fileErr) {
    return next({
      msg: "invalid file format",
    });
  }
  ProductQuery.update(req.params.id, data)
    .then(function (data) {
      if (req.file) {
        // remove existing file
        fs.unlink(
          path.join(process.cwd(), "uploads/images/" + data.oldImages[0]),
          function (err, done) {
            if (err) {
              console.log("err deleting file");
            } else {
              console.log("file removed");
            }
          }
        );
        console.log("data.oldImages", data.oldImages);
      }
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}
function remove(req, res, next) {
  ProductQuery.remove(req.params.id)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

module.exports = {
  get,
  getById,
  search,
  post,
  put,
  remove,
};
