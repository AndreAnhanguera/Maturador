const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

let mainWindow = null;
const instances = new Set();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    }
  });

  mainWindow.loadFile('index.html');
}

function createInstanceWindow(data) {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    }
  });

  // pass data as query params to instance.html
  win.loadFile('instance.html', { query: data }).catch(() => {
    // fallback: open WhatsApp Web externally if local load fails
    shell.openExternal('https://web.whatsapp.com');
  });

  instances.add(win);
  win.on('closed', () => instances.delete(win));
  return true;
}

ipcMain.handle('create-instance', async (event, data) => {
  try {
    return createInstanceWindow(data);
  } catch (err) {
    console.error('Erro ao criar instância:', err);
    return false;
  }
});

ipcMain.handle('open-external', async (event, url) => {
  try {
    await shell.openExternal(url);
    return true;
  } catch (err) {
    console.error('Erro openExternal:', err);
    return false;
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});