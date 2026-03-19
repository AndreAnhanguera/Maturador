import { ZodError } from 'zod';

export function errorMiddleware(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(422).json({
      error: 'Dados inválidos.',
      details: error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }))
    });
  }

  const status = error.status || 500;
  const message = error.message || 'Erro interno do servidor.';

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({ error: message });
}
