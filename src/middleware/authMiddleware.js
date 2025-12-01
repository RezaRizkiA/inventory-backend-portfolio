const jwt = require("jsonwebtoken");
const { user } = require("../utils/prisma");

const authenticateToken = (req, res, next) => {
  // ambil token dari header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Akses ditolak! Token tidak ada" });
  }

  // verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token tidak valid atau kadaluarsa" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
