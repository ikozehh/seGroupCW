const electron = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')
var win;
var buyWindow;
var jailWindow;
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.loadFile('setup.html')
}

ipcMain.on("getPlayers", function(e, args){
  console.log("Received player details from startup")
  win.loadFile('game.html')
  win.webContents.on('did-finish-load', () => {
  win.webContents.send("sendPlayersInitGame", args)
});
})

ipcMain.on("letBuy", (e,tile) => {
  buyWindow = new BrowserWindow({
    width:300,
    height:400,
    webPreferences:{
      nodeIntegration:true
    }
  })
  buyWindow.loadFile("buyPage.html")
  buyWindow.webContents.on('did-finish-load', () => {
    buyWindow.webContents.send("loadBuyTile",tile)
  })
})

ipcMain.on("purchaseProperty",(e,purchase) => {
  buyWindow.close()
  win.webContents.send("purchasePropertyRen", purchase)
})

ipcMain.on("infoMessage",(e,message) => {
  dialog.showMessageBox({
  type: 'info',
  title: 'Information',
  message: message,
  defaultId: 0,
  cancelId: 0,
  buttons: ['Okay']
}, (buttonIndex) => {
  //postExitApp()
});
})

ipcMain.on("goJail", (e,args) => {
  jailWindow = new BrowserWindow({
    width:300,
    height:400,
    webPreferences:{
      nodeIntegration:true
    }
  })
  jailWindow.loadFile("jail.html")
})

ipcMain.on("leaveJail", (e,leave) => {
  win.webContents.send("leaveJailRen",leave)
})

app.whenReady().then(createWindow)
