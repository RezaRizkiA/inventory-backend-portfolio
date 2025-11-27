const dashboardService = require("../services/dashboardService");

const getStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json({
      success: true,
      message: "Data dashboard berhasil diambil",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};

module.exports = { getStats };
