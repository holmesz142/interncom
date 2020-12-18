const electron = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain, dialog } = require('electron');
const fs = require('fs');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
            enableRemoteModule: true,
        }
    });

    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './app/main.html'),
        protocol: 'file:',
        slashes: true
    }));



    mainWindow.on('closed', function () {
        app.quit();
    })

    //build menu from template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
]

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}