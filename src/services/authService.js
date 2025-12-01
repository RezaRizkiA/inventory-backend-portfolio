const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  const { email, password, username } = userData;

  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // simpan user baru
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  // Hapus password dari response
  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

const login = async (email, password) => {
  // Cek apakah email ada
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email atau password salah!");
  }

  // cocokan password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email atau password salah!");
  }

  // bikin jwt token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: { id: user.id, email: user.email, username: user.username },
    token,
  };
};

module.exports = { register, login };
