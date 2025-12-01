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
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: newProduct,
    });
  } catch (error) {
    // p2002 unique constraint failed Prisma ORM (Pelanggaran Batasan Unik)
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ success: false, message: "SKU sudah terdaftar!" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, createProduct };
