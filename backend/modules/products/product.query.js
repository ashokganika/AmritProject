const ProductModel = require("./product.model");
function map_product_req(product, productDetails) {
  if (productDetails.name) product.name = productDetails.name;

  if (productDetails.description)
    product.description = productDetails.description;

  if (productDetails.category) product.category = productDetails.category;

  if (productDetails.price) product.price = productDetails.price;

  if (productDetails.color) product.color = productDetails.color;

  if (productDetails.brand) product.brand = productDetails.brand;

  if (productDetails.status) product.status = productDetails.status;

  if (productDetails.size) product.size = productDetails.size;

  if (productDetails.manuDate) product.manuDate = productDetails.manuDate;

  if (productDetails.expiryDate) product.expiryDate = productDetails.expiryDate;

  if (productDetails.modelNo) product.modelNo = productDetails.modelNo;

  if (productDetails.images) product.images = productDetails.images;

  if (productDetails.vendor) product.vendor = productDetails.vendor;

  if (productDetails.tags)
    product.tags =
      typeof productDetails.tags === "string"
        ? productDetails.tags.split(",")
        : productDetails.tags;
  if (productDetails.offers)
    product.offers =
      typeof productDetails.offers === "string"
        ? productDetails.offers.split(",")
        : productDetails.offers;
  if (product.discount || productDetails.discountedItem) {
    if (!product.discount) {
      product.discount = {};
    }
    product.discount.discountedItem = productDetails.discountedItem;
    if (productDetails.discountType)
      product.discount.discountType = productDetails.discountType;
    if (productDetails.discount)
      product.discount.discount = productDetails.discount;
  }
  if (productDetails.warrantyItem) {
    product.warranty = {};
    product.warranty.warrantyItem = productDetails.warrantyItem;
    product.warranty.warrantyPeriod = productDetails.warrantyPeriod;
  }

  if (productDetails.reviewPoint && productDetails.reviewMessage) {
    let reviews = {
      point: productDetails.reviewPoint,
      message: productDetails.reviewMessage,
    };
    product.reviews.push(reviews);
  }
  return product;
}
function find(condition) {
  return ProductModel.find(condition)
    .sort({
      _id: -1,
    })
    .exec();
}
function insert(data) {
  var newProduct = new ProductModel({});
  map_product_req(newProduct, data);
  return newProduct.save();
}
function update(id, data) {
  return new Promise(function (resolve, reject) {
    ProductModel.findById(id).exec(function (err, product) {
      if (err) {
        return reject(err);
        console.log("error in back>>", err);
      }
      if (!product) {
        return reject({
          msg: "product not found",
        });
      }
      var mappedUpdatedProduct = map_product_req(product, data);
      mappedUpdatedProduct.save(function (err, updated) {
        if (err) {
          reject(err);
        } else {
          resolve(updated);
        }
      });
    });
  });
}
function remove(id) {
  return ProductModel.findByIdAndRemove(id);
}
module.exports = {
  find,
  insert,
  update,
  remove,
  map_product_req,
};
