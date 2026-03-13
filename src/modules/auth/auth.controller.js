import { registerSchema, loginSchema } from './auth.schema.js';
import { loginUser, registerUser } from './auth.service.js';

export async function register(req, res) {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data);
  res.status(201).json(user);
}

export async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const result = await loginUser(data);
  res.json(result);
}

export async function me(req, res) {
  res.json({ user: req.user });
}
