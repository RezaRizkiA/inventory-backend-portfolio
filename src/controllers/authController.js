const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "User berhasil didaftarkan!",
        data: user,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res
      .status(200)
      .json({ success: true, message: "Login Berhasil", data: result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { register, login };
