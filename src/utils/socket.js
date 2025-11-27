const { Server } = require("socket.io");

let io;

module.exports = {
  // fungsi utk inisialisasi awal (dipanggil di server.js)
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*", // di production, ganti * dengan domain frontend asli
        methods: ["GET", "POST"],
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io belum diinisialisasi!");
    }
    return io;
  },
};
