const form = document.getElementById('automation-form');
const chipIdInput = document.getElementById('chipId');
const phoneNumberInput = document.getElementById('phoneNumber');
const messageInput = document.getElementById('message');
const addNumberButton = document.getElementById('add-number');
const numbersListElement = document.getElementById('numbers-list');

const phoneNumbers = [];

addNumberButton.addEventListener('click', () => {
  const rawNumber = phoneNumberInput.value.trim();

  if (!rawNumber) {
    setStatus('Digite um número para adicionar.');
    return;
  }

  if (phoneNumbers.includes(rawNumber)) {
    setStatus('Este número já foi cadastrado.');
    return;
  }

  phoneNumbers.push(rawNumber);
  phoneNumberInput.value = '';
  renderNumbers();
  setStatus(`Número ${rawNumber} adicionado com sucesso.`);
});

form.addEventListener('submit', async (e) => {

  const chipId = chipIdInput.value.trim();
  const messageTemplate = messageInput.value.trim();

  if (phoneNumbers.length < 2) {
    setStatus('Cadastre ao menos 2 números para permitir mensagens entre eles.');
    return;
  }

  setStatus('Abrindo instâncias para todos os números cadastrados...');

  let successCount = 0;
  for (const phoneNumber of phoneNumbers) {
    const message = buildMessageForNumber(messageTemplate, phoneNumber);

    try {
      const created = await window.electronAPI.createInstance({ chipId, phoneNumber, message });
      if (created) successCount += 1;
    } catch (err) {
      console.error(`Erro ao criar instância para ${phoneNumber}:`, err);
    }
  }

  if (successCount === phoneNumbers.length) {
    setStatus(`Instâncias criadas com sucesso (${successCount}/${phoneNumbers.length}).`);
  } else {
    setStatus(`Instâncias criadas parcialmente (${successCount}/${phoneNumbers.length}).`);
  }
});

document.getElementById('open-wa').addEventListener('click', async () => {
  setStatus('Abrindo WhatsApp Web no navegador externo...');
  await window.electronAPI.openExternal('https://web.whatsapp.com');
});

function buildMessageForNumber(template, destinationNumber) {
  if (!template.includes('{destinatario}')) {
    return `${template}\n\nDestino: ${destinationNumber}`;
  }

  return template.replaceAll('{destinatario}', destinationNumber);
}

function renderNumbers() {
  numbersListElement.innerHTML = '';

  if (phoneNumbers.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-item';
    empty.textContent = 'Nenhum número cadastrado.';
    numbersListElement.appendChild(empty);
    return;
  }

  phoneNumbers.forEach((phoneNumber, index) => {
    const item = document.createElement('li');

    const numberText = document.createElement('span');
    numberText.textContent = phoneNumber;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
      phoneNumbers.splice(index, 1);
      renderNumbers();
      setStatus(`Número ${phoneNumber} removido.`);
    });

    item.appendChild(numberText);
    item.appendChild(removeButton);
    numbersListElement.appendChild(item);
  });
}

function setStatus(text) {
  const st = document.getElementById('status');
  st.textContent = text;
}

renderNumbers();

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

particlesJS("particles-js", {

particles: {

number: {
value: 80
},

color: {
value: "#ffffff"
},

shape: {
type: "circle"
},

opacity: {
value: 0.5
},

size: {
value: 3
},

move: {
speed: 2
}

}

});
