// Langkah 1. Setup Prisma Client
// tujuannya supaya tidak perlu menulis new PrismaClient() berulang kali di setiap file
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Langkah 2. Export Prisma Client
// supaya bisa digunakan di file lain
module.exports = prisma;