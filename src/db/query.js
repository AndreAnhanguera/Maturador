import { pool } from './pool.js';

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result;
}
