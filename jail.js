const electron = require('electron');
const {ipcRenderer} = require('electron');

(function(){
  var leaveJailBtn = document.getElementById("leaveJail")
  var stayJailBtn = document.getElementById("stayJail")

  leaveJailBtn.addEventListener("click", () => {
    ipcRenderer.send("leaveJail",true)
  })

  stayJailBtn.addEventListener("click", () => {
    ipcRenderer.send("leaveJail", false)
  })
}())
