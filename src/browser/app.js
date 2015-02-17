"use 6to5";

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

function loadTemplate(name) {
  mainWindow.loadUrl(`file://${__dirname}/../client/${name}.html`);
}

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    'use-content-size': false
  });
  loadTemplate('app');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
