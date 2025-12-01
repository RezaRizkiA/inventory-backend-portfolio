const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware")
const validate = require("../middleware/validateMiddleware");
const { productSchema } = require("../validations/apiSchemas");

router.get("/", productController.getProducts);
router.post("/", validate(productSchema), authenticateToken, productController.createProduct);

module.exports = router;
