const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('$api', {
  fs: {
    readdir: async (path) => {
      return await ipcRenderer.invoke('readdir', path);
    },
    openDirectory: async () => {
      return await ipcRenderer.invoke('openDirectory');
    }
  },
});
