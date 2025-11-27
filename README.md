# Real-time Inventory & Sales Command Center

Backend API canggih untuk mengelola stok inventaris dan penjualan E-commerce secara otomatis dan real-time. Dibangun untuk mensimulasikan kebutuhan dashboard modern yang membutuhkan integritas data tinggi.

## Fitur Utama (Key Features)

- **Real-time Updates:** Menggunakan **Socket.io** untuk memancarkan data penjualan ke dashboard klien tanpa refresh halaman.
- **ACID Transactions:** Menggunakan **Prisma Interactive Transactions** untuk menjamin konsistensi data (Stok berkurang otomatis saat Transaksi tercatat).
- **Automated Alerts:** Sistem otomatis mendeteksi stok menipis (Low Stock Threshold) dan mencatat log peringatan.
- **Analytics Aggregation:** API khusus untuk menghitung total omzet dan ringkasan data secara efisien di sisi database.
- **API Documentation:** Dokumentasi interaktif menggunakan **Swagger UI**.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (Service-Repository Pattern)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Real-time:** Socket.io
- **Docs:** Swagger UI / OpenAPI

## Struktur Project (Architecture)

Project ini menggunakan pendekatan **Service Layer Pattern** untuk memisahkan *Business Logic* dari *HTTP Controller*, membuat kode lebih *testable* dan *scalable*.

```bash
src/
├── controllers/  # Menangani Request & Response
├── services/     # Logika Bisnis (Automation, Transaction)
├── routes/       # Definisi Endpoint API
├── utils/        # Helper (Prisma Client, Socket.io instance)
└── app.js        # Konfigurasi Express