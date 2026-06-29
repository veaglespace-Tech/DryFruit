const mysql = require('mysql2/promise');
require('dotenv').config();

async function init() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'Root',
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'nutriroots_db'}\`;`);
    console.log(`✅ Database ${process.env.DB_NAME || 'nutriroots_db'} created or already exists.`);
    await connection.end();
  } catch (error) {
    console.error('❌ Failed to create database:', error.message);
    process.exit(1);
  }
}

init();
