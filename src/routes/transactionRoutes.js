const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateToken = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { transactionSchema } = require("../validations/apiSchemas");

router.post("/", authenticateToken, validate(transactionSchema), transactionController.createTransaction);
router.get("/", authenticateToken, transactionController.getTransactions);

module.exports = router;
