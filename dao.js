import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL_INTERNAL : process.env.DATABASE_URL_EXTERNAL;

const pool = new Pool({
    connectionString : dbUrl,
    ssl: { rejectUnauthorized: false },
});

async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

export async function getAll() {
  const result = await query('SELECT * FROM test');
  console.log(result.rows); // Array of user objects
  return result.rows;
}

export async function addItem(name) {
  const result = await query('INSERT INTO test (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
}
