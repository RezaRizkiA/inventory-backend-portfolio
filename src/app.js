const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// imp library dokumentasi
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

// inisialisasi express
const app = express();

// Middleware
// mengizinkan frontend mengakses API ini (CORS)
app.use(cors());
// mengizinkan express untuk membaca body request dalam format JSON
app.use(express.json());

// Routes testing
app.get("/", (req, res) => {
  res.send({
    message: "Halo! Inventory API sudah jalan",
    server_time: new Date(),
  });
});

// Load file YAML
// Gunakan path.join agar aman di Windows/Linux
const swaggerDocument = YAML.load(path.join(__dirname, '../api.yaml'));

// Buat Route khusus untuk dokumentasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes product
app.use("/api/products", productRoutes);

// routers transaction
app.use("/api/transactions", transactionRoutes);

// routes dashboard
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
