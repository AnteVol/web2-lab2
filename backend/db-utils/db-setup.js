require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
  

const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user'))
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS protected_data (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                access_level VARCHAR(20) NOT NULL CHECK (access_level IN ('admin', 'user'))
            )
        `);

        const existingUsers = await pool.query('SELECT * FROM users LIMIT 1');
        if (existingUsers.rows.length === 0) {
            await pool.query(`
                INSERT INTO users (username, password, role) VALUES
                ('admin', 'admin123', 'admin'),
                ('user', 'user123', 'user')
            `);
        }

        const existingData = await pool.query('SELECT * FROM protected_data LIMIT 1');
        if (existingData.rows.length === 0) {
            await pool.query(`
                INSERT INTO protected_data (content, access_level) VALUES
                ('Only admin should access to this data 1', 'admin'),
                ('Only admin should access to this data 2', 'admin'),
                ('Everyone can access to this data 1', 'user'),
                ('Everyone can access to this data 2', 'user'),
                ('Everyone can access to this data 3', 'user'),
                ('Everyone can access to this data 4', 'user')
            `);
        }

        console.log('Database initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

module.exports = {
    initializeDatabase,
    pool
};