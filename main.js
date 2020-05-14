const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var win;
var buyWindow;
var jailWindow;
var upgradeWindow;
var auctionWindow;
var choiceWindow;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.loadFile('setup.html')
}

ipcMain.on("getPlayers", (e, args) => {
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

ipcMain.on("letAuction", (e,auctionInfo) => {
  auctionWindow = new BrowserWindow({
    width:300,
    height:400,
    webPreferences:{
      nodeIntegration:true
    }
  })
  auctionWindow.loadFile("auctionPage.html")
  auctionWindow.webContents.on("did-finish-load", () => {
    auctionWindow.webContents.send("loadAuctionData", auctionInfo)
  })
})

ipcMain.on("auctionPurchase",(e,aucInfo) => {
  auctionWindow.close()
  win.webContents.send("auctionPurchaseRen", aucInfo)
})

ipcMain.on("giveChoices", (e,choices) => {
  dialog.showMessageBox({
  type: 'info',
  title: 'Pot Luck Choice',
  message: choices[0],
  defaultId: 0,
  cancelId: 0,
  buttons: choices[1]
}, (buttonIndex) => {
  win.webContents.send("actionChoiceRen", choices[1][buttonIndex])
});
})

ipcMain.on("offerUpgrades",(e,propertiesInfo) => {
  upgradeWindow = new BrowserWindow({
    width:300,
    height:400,
    webPreferences:{
      nodeIntegration:true
    }
  })
  upgradeWindow.loadFile("upgradePage.html")
  upgradeWindow.webContents.on("did-finish-load", () => {
    upgradeWindow.webContents.send("loadUpgradeOptions", propertiesInfo)
  })
})

ipcMain.on("purchaseUpgrades",(e,upgrades) => {
  upgradeWindow.close()
  win.webContents.send("upgradeChoices", upgrades)
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
  jailWindow.close()
  win.webContents.send("leaveJailRen",leave)
})

app.whenReady().then(createWindow)
