const validate = (schema) => (req, res, next) => {
  // Gunakan safeParse agar server tidak crash
  const result = schema.safeParse(req.body);

  if (result.success) {
    // PENTING: Replace req.body dengan data bersih hasil validasi
    // Ini otomatis membuang field sampah yang tidak ada di schema
    req.body = result.data;
    next();
  } else {
    // Ambil error dengan aman
    const errorMessages = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Data tidak valid",
      errors: errorMessages,
    });
  }
};

module.exports = validate;