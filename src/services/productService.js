const prisma = require("../utils/prisma");

// default: halaman 1, 10 item per halaman, tidak ada search
const getProducts = async (page = 1, limit = 10, search = "") => {
  // hitung berapa data yang harus dilewati
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // siapkan filter where clause
  // jika ada search, filter berdasarkan nama, jika tidak, ambil semua.
  const whereClause = search
    ? { name: { contains: search, mode: "insensitive" } }
    : {};

  // jalankan 2 query sekaligus ( ambil data & hitung total)
  // pakai Promise.all biar cepat (paralel)
  const [products, totalItems] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      skip: skip,
      take: parseInt(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: whereClause, // hitung total item yang COCOK dengan filter saja.
    }),
  ]);

  // return data + metadata pagination
  // frontend butun info ini untuk bikin tombol "next/prev"
  return {
    data: products,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / parseInt(limit)),
      totalItems: totalItems,
      perPage: parseInt(limit),
    },
  };
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
  getProducts,
  createProduct,
};
