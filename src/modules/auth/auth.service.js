import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../../db/query.js';
import { env } from '../../config/env.js';
import { HttpError } from '../../utils/httpError.js';

export async function registerUser(data) {
  const existing = await query('SELECT id FROM users WHERE email = $1', [data.email]);
  if (existing.rowCount > 0) {
    throw new HttpError(409, 'E-mail já cadastrado.');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const result = await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [data.name, data.email, passwordHash, data.role || 'admin']
  );

  return result.rows[0];
}

export async function loginUser(data) {
  const result = await query('SELECT * FROM users WHERE email = $1', [data.email]);
  if (result.rowCount === 0) {
    throw new HttpError(401, 'Credenciais inválidas.');
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(data.password, user.password_hash);
  if (!ok) {
    throw new HttpError(401, 'Credenciais inválidas.');
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, name: user.name },
    env.jwtSecret,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}
