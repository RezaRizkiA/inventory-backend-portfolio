const prisma = require("../utils/prisma");

const getDashboardStats = async () => {
  // jalankan 3 query secara paralel (bersamaan) utk efisiensi
  // daripada menunggu satu-satu (sequential)
  const [totalProducts, lowStockItems, transactionsAgg, recentLogs] =
    await Promise.all([
      // 1. hitung total jenis barang
      prisma.product.count(),

      // 2. cari barang yang stoknya di bawah threshold
      prisma.product.findMany({
        where: {
          stock: { lte: prisma.product.fields.threshold }, // lte = less than or equal
        },
        select: { name: true, stock: true, threshold: true },
      }),

      // 3. hitung total omzet (sum of totalAmount)
      prisma.transaction.aggregate({
        _sum: {
          totalAmount: true,
        },
        _count: {
          id: true, // total jumlah transaksi
        },
      }),

      // 4. ambil 10 log otomasi terbaru
      prisma.automationLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);
  // rapikan format data sblm dikirim ke controller
  return {
    summary: {
      total_products: totalProducts,
      total_transactions: transactionsAgg._count.id,
      total_revenue: transactionsAgg._sum.totalAmount || 0,
      low_stock_count: lowStockItems.length,
    },
    low_stock_details: lowStockItems,
    recent_logs: recentLogs,
  };
};

module.exports = {
  getDashboardStats,
};
