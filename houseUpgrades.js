const electron = require('electron');
const {ipcRenderer} = require('electron');

(function(){
  var purchaseBtn = document.getElementById("buyUpgradesBtn")
  var rejectBtn = document.getElementById("rejectUpgradesBtn")

  purchaseBtn.addEventListener("click", () => {
    ipcRenderer.send("purchaseUpgrades", true)
  })

  rejectBtn.addEventListener("click", () => {
    ipcRenderer.send("purchaseUpgrades", {"buyingUpgrades":false})
  })
  ipcRenderer.on("loadUpgradeOptions",(e,propertyInfo) => {
    let list = document.getElementById("houseList")
    for(let property of propertyInfo){
      let listElement = document.createElement("li")
      let checkBox = document.createElement("input")
      checkBox.type = "checkbox"
      let houseCost = property.houseCost
      let houseName = property.name
      let numOfHouses = property.numOfHouses
      checkBox.id = houseName
      let houseCostSpan = document.createElement("span")
      let houseNameSpan = document.createElement("span")
      let numHousesSpan = document.createElement("span")
      let containerDiv = document.createElement("div")
      containerDiv.className = "optionDiv"
      houseCostSpan.innerText = houseCost
      houseNameSpan.innerText = houseName
      numHousesSpan.innerText = numOfHouses
      containerDiv.appendChild(houseNameSpan)
      containerDiv.appendChild(houseCostSpan)
      containerDiv.appendChild(numHousesSpan)
      containerDiv.appendChild(checkBox)
      listElement.appendChild(containerDiv)
      list.appendChild(listElement)

    }
  })


}())
