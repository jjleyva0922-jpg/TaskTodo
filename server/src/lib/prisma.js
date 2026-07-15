const { PrismaClient } = require('@prisma/client');

// Simple commonjs export of PrismaClient. Using the default client works
// with Neon/Postgres connection via DATABASE_URL in .env
const prisma = new PrismaClient();

module.exports = prisma;
