// Preload script: expõe APIs seguras ao renderer
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createInstance: (data) => ipcRenderer.invoke('create-instance', data),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});