const prisma = require("../utils/prisma");
const socketUtil = require("../utils/socket");

const createTransaction = async (data) => {
  const { productId, quantity, platform } = data;

  // gunakan prisma.$transaction untuk memastikan integritas data
  // artinya: semua sukses, atau semua gagal (rollback)
  return await prisma
    .$transaction(async (tx) => {
      // 1. cek produk dulu
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Produk tidak ditemukan");
      }

      // 2. cek stok
      if (product.stock < quantity) {
        throw new Error(`Stok tidak cukup! Sisa stok: ${product.stock}`);
      }

      // 3. hitung total harga
      const totalAmount = product.price * quantity;

      // 4. update stok produk (kurangi)
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
      });

      // 5. buat transaksi
      const newTransaction = await tx.transaction.create({
        data: {
          productId,
          quantity,
          totalAmount,
          platform,
        },
      });

      // 6. otomasi: cek threshold dan buat log jika stok menipis
      if (updatedProduct.stock <= product.threshold) {
        await tx.automationLog.create({
          data: {
            type: "LOW_STOCK_ALERT",
            message: `Stok produk '${updatedProduct.name}' (ID: ${updatedProduct.id}) menipis. Sisa stok: ${updatedProduct.stock}`,
          },
        });
      }

      return newTransaction;
    })
    .then((result) => {
      // Emit event via socket.io setelah transaksi berhasil/selesai
      // panggil socket io
      try {
        const io = socketUtil.getIO();
        io.emit("dashboard_update", {
          type: "NEW_TRANSACTION",
          message: `Penjualan baru dari platform ${platform}`,
          data: result, // kirim data transaksi baru
        });
        console.log("Socket emitted: dashboard_update");
      } catch (error) {
        console.log("Socket error (aman diabaikan): ", error.message);
      }

      return result;
    });
};

const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    include: {
      product: {
        select: { name: true, sku: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  createTransaction,
  getAllTransactions,
};
