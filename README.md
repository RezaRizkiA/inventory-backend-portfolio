# Real-time Inventory & Sales Command Center

Backend API canggih untuk mengelola stok inventaris dan penjualan E-commerce secara otomatis dan real-time. Dibangun untuk mensimulasikan kebutuhan dashboard modern yang membutuhkan integritas data tinggi.

---

## Fitur Utama (Key Features)

- **Real-time Updates:** Menggunakan **Socket.io** untuk memancarkan data penjualan ke dashboard klien tanpa refresh halaman.
- **ACID Transactions:** Menggunakan **Prisma Interactive Transactions** untuk menjamin konsistensi data (Stok berkurang otomatis saat Transaksi tercatat).
- **Automated Alerts:** Sistem otomatis mendeteksi stok menipis (**Low Stock Threshold**) dan mencatat log peringatan.
- **Analytics Aggregation:** API khusus untuk menghitung total omzet dan ringkasan data secara efisien di sisi database.
- **API Documentation:** Dokumentasi interaktif menggunakan **Swagger UI**.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (Service-Repository Pattern)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Real-time:** Socket.io
- **Docs:** Swagger UI / OpenAPI

---

## Struktur Project (Architecture)

Project ini menggunakan pendekatan **Service Layer Pattern** untuk memisahkan *Business Logic* dari *HTTP Controller*, membuat kode lebih *testable* dan *scalable*.

```
src/
├── controllers/  # Menangani Request & Response
├── services/     # Logika Bisnis (Automation, Transaction)
├── routes/       # Definisi Endpoint API
├── utils/        # Helper (Prisma Client, Socket.io instance)
└── app.js        # Konfigurasi Express
```

## Cara Menjalankan (How to Run)
Berikut adalah langkah-langkah untuk menyiapkan dan menjalankan server API secara lokal.

### 1. Clone Repository
```
git clone git@github.com:RezaRizkiA/inventory-backend-portfolio.git
cd inventory-backend-portfolio
```

### 2. Install Dependencies
- Pasang semua paket Node.js yang diperlukan:
```
npm install
```

### 3. Setup Database & Environment
Pastikan Anda memiliki instance PostgreSQL yang berjalan secara lokal.

- Konfigurasi Variabel Lingkungan: Rename file .env.example menjadi .env. Sesuaikan string koneksi database Anda di .env, contoh:
```
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"
```
- Jalankan Migrasi Database: Prisma akan membuat tabel yang diperlukan dan menerapkan skema model:
```
npx prisma migrate dev --name init
```

### 4. Jalankan Server
Jalankan aplikasi dalam mode pengembangan:

```
npm run dev
```

Server API sekarang berjalan dan mendengarkan pada: http://localhost:3000

## Dokumentasi API
Setelah server berjalan, Anda dapat mengakses Swagger UI untuk mencoba semua endpoint secara langsung:

 http://localhost:3000/api-docs