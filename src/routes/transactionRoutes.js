const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, transactionController.createTransaction);
router.get("/", authenticateToken, transactionController.getTransactions);

module.exports = router;
