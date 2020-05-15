const electron = require('electron');
const {ipcRenderer} = require('electron');

(function(){
  var purchaseBtn = document.getElementById("buyUpgradesBtn")
  var rejectBtn = document.getElementById("rejectUpgradesBtn")

  purchaseBtn.addEventListener("click", () => {
    let checkedBoxes = document.querySelectorAll("input:checked")
    console.log(checkedBoxes)
    let upgradeObj = {"buyingUpgrades":true}
    checkedBoxes.forEach((property) => {
      console.log(property)
      upgradeObj[property.id] = true
    })
    console.log(upgradeObj)
    ipcRenderer.send("purchaseUpgrades", upgradeObj)
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
      let houseCost = " £" + property.houseCost + "\n"
      let houseName = property.name
      let numOfHouses = " Current number of houses: " + property.numOfHouses + "\n"
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
