const app = require("./app");
const dotenv = require("dotenv");
const http = require("http"); // 1. import module http bawaan node
const socketUtil = require("./utils/socket"); // 2. import utility socket

dotenv.config();

const PORT = process.env.PORT || 3000;

// bungkus express app dgn http server
const server = http.createServer(app);

// inisialisasi socket.io
const io = socketUtil.init(server);

// event listener standar (opsional, untuk debug koneksi)
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

// Jalankan SERVER (bukan app.listen lagi, tapi server.listen)
server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.io siap menerima koneksi real-time`);
  console.log(`=========================================`);
});
