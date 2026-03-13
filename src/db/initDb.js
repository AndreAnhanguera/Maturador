import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './pool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlPath = path.resolve(__dirname, '../../sql/init.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

(async () => {
  try {
    await pool.query(sql);
    console.log('Banco inicializado com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
