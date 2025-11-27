const prisma = require("../utils/prisma");

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
};

const createProduct = async (productData) => {
  const { sku, name, stock, price, threshold } = productData;

  const newProduct = await prisma.product.create({
    data: {
      sku,
      name,
      stock: parseInt(stock),
      price: parseFloat(price),
      threshold: threshold ? parseInt(threshold) : 5,
    },
  });

  return newProduct;
};

module.exports = {
  getAllProducts,
  createProduct,
};
