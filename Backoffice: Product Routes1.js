// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/authMiddleware");
const { getProducts, createProduct, updateProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", auth, requireRole(["admin"]), createProduct);
router.put("/:id", auth, requireRole(["admin"]), updateProduct);

module.exports = router;
