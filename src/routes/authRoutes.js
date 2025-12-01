const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const validate = require("../middleware/validateMiddleware");
const { registerSchema, loginSchema } = require("../validations/apiSchemas");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
