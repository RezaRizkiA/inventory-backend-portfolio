const transactionService = require("../services/transactionService");

const createTransaction = async (req, res) => {
  try {
    const { productId, quantity, platform } = req.body;
    if (!productId || !quantity || !platform) {
      return res.status(400).json({
        success: false,
        message: "Product ID, Quantity, dan Platform wajib diisi!",
      });
    }

    const result = await transactionService.createTransaction({
      productId: parseInt(productId),
      quantity: parseInt(quantity),
      platform,
    });

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dicatat",
      data: result,
    });
  } catch (error) {
    // tangkap error stok habis dari service
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const data = await transactionService.getAllTransactions();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTransaction, getTransactions };
