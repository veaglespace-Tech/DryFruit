const { PrismaClient } = require('@prisma/client');

// Use standard Prisma client without MariaDB adapter
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    // Verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ MySQL Database connected successfully via Prisma 🌿');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const matchPassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { prisma, connectDB, hashPassword, matchPassword };
