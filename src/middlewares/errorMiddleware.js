export function errorMiddleware(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || 'Erro interno do servidor.';

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({ error: message });
}
