const { pool } = require("./db")
require("dotenv").config();
const { URL } = require("url");
const dbUrl = new URL(process.env.MYSQL_URL)

async function initDB() { 
  try {
    // await pool.query(`DROP TABLE IF EXISTS sessions`);
    // await pool.query(`DROP TABLE IF EXISTS not_to_dos`);
    // await pool.query(`DROP TABLE IF EXISTS users`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Table users created (if not already exist)');
    await pool.query(`
    CREATE TABLE IF NOT EXISTS not_to_dos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
    `)
    console.log('Table not_to_dos created (if not already exist)');
    await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(100) NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
    `)
    console.log('Table sessions created (if not already exist)');
  } catch (error) {
    console.error(error)
  }
}

initDB()