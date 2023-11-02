const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require('fs');
const { dialog } = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.webContents.openDevTools();

  win.loadURL('http://localhost:8000');
};

app.whenReady().then(() => {
  // 动态加载ipc脚本
  const files = fs.readdirSync(path.join(__dirname, 'ipc'));
  files.forEach((item) => {
    require('./ipc/' + item);
  });

  createWindow();
});
