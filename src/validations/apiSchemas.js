const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter" })
    .optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const productSchema = z.object({
  sku: z.string().min(3, { message: "SKU wajib diisi minimal 3 karakter" }),
  name: z.string().min(3, { message: "Nama produk wajib diisi" }),
  // z.coerce.number() memaksa string "100" menjadi angka 100
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "Stok tidak boleh negatif" }),
  price: z.coerce.number().positive({ message: "Harga harus lebih dari 0" }),
  threshold: z.coerce.number().int().optional(),
});

const transactionSchema = z.object({
  productId: z.coerce.number().int(),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Jumlah beli harus positive" }),
  platform: z.enum(["Tokopedia", "Shopee", "Tiktok", "Offline", "Lainya"], {
    errorMap: () => ({
      message: "Platform tidak valid (Gunakan: Tokopedia/Shopee/dll",
    }),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  transactionSchema,
};
