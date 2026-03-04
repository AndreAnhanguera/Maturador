// Instance renderer: mostra informações do chip e gerencia o webview
function qs() {
  return new URLSearchParams(window.location.search);
}

const params = qs();
const chipId = params.get('chipId') || '—';
const phoneNumber = params.get('phoneNumber') || '—';
const message = params.get('message') || '—';

document.getElementById('chipInfo').textContent = `Chip: ${chipId} | Número: ${phoneNumber}`;

const webview = document.getElementById('waWebview');

// se o webview falhar (ex: compatibilidade com versão do Chrome), abrir externo como fallback
webview.addEventListener('did-fail-load', () => {
  console.warn('webview falhou ao carregar — abrindo no navegador externo');
  if (window.electronAPI && window.electronAPI.openExternal) {
    window.electronAPI.openExternal('https://web.whatsapp.com');
  }
});

document.getElementById('openExternal').addEventListener('click', () => {
  if (window.electronAPI && window.electronAPI.openExternal) {
    window.electronAPI.openExternal('https://web.whatsapp.com');
  }
});

// foco no webview para permitir login/QR scan
webview.addEventListener('dom-ready', () => {
  webview.focus();
});
