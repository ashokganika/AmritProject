const router = require("express").Router();
const authenticate = require("./../middleware/authentication");
const authRoute = require("./../controller/auth.route");
const userRoute = require("./../controller/user.router");
const ProductRoute = require("./../modules/products/product.route");

router.use("/auth", authRoute);
router.use("/user", authenticate, userRoute);
router.use("/product", authenticate, ProductRoute);

module.exports = router;
