// renderer: cria novas instâncias (janelas) para cada chip via IPC

document.getElementById('automation-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const chipId = document.getElementById('chipId').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const message = document.getElementById('message').value.trim();
  setStatus('Abrindo nova instância...');

  try {
    const created = await window.electronAPI.createInstance({ chipId, phoneNumber, message });
    if (created) setStatus('Instância criada com sucesso.');
    else setStatus('Falha ao criar instância.');
  } catch (err) {
    setStatus('Erro: ' + err.message);
  }
});

document.getElementById('open-wa').addEventListener('click', async () => {
  setStatus('Abrindo WhatsApp Web no navegador externo...');
  await window.electronAPI.openExternal('https://web.whatsapp.com');
});

function setStatus(text) {
  const st = document.getElementById('status');
  st.textContent = text;
}

// placeholders para chamadas externas (mantidos para futura integração)
async function maturateChip(chipId) {
  const evolutionUrl = 'https://api.evolution.example.com/maturar';
  const payload = { chipId };
  const resp = await fetch(evolutionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error('Falha ao maturar chip');
  return resp.json();
}

async function sendMessage(phoneNumber, text) {
  const n8nUrl = 'https://n8n.example.com/webhook/send-message';
  const payload = { phoneNumber, text };
  const resp = await fetch(n8nUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error('Falha ao enviar mensagem');
  return resp.json();
}
