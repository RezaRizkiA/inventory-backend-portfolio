const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { sku, name, price } = req.body;
    if (!sku || !name || !price) {
      return res.status(400).json({
        success: false,
        message: "SKU, Name, dan Price wajib diisi!",
      });
    }
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: newProduct,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ success: false, message: "SKU sudah terdaftar!" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, createProduct };
