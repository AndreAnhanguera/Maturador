/**
 * Normaliza número de telefone para o formato usado pela Evolution API.
 * Remove tudo que não for dígito e garante código de país.
 * Ex: "+55 (11) 99999-9999" → "5511999999999"
 */
export function normalizePhone(phone) {
  if (!phone) return phone;
  const digits = String(phone).replace(/\D/g, '');
  // Se começar com 0, remove
  return digits.startsWith('0') ? digits.slice(1) : digits;
}
