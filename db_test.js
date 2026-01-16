import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

console.log("Testing connection to:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(client => {
        console.log('✅ Connected successfully!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('✅ Query result:', res.rows[0]);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Error:', err);
        process.exit(1);
    });
