const electron = require('electron');
const {ipcRenderer} = require('electron');
(function(){
  var purchaseBtn = document.getElementById("buyHouse")
  var rejectBtn = document.getElementById("rejectHouse")

  purchaseBtn.addEventListener("click", () => {
    ipcRenderer.send("purchaseProperty", true)
  })

  rejectBtn.addEventListener("click", () => {
    ipcRenderer.send("purchaseProperty", false)
  })

  ipcRenderer.on("loadBuyTile", (e,tileInfo) => {
    if(tileInfo.owner != null){
      document.getElementById("buyMessage").innerText = "You can buy a new house for a property you own"
    }else{
      document.getElementById("buyMessage").innerText = "Would you like to buy this new property?"
    }
    document.getElementById("houseName").innerText = "Property Name: "+tileInfo.name
    document.getElementById("houseType").innerText = "Property Type: " + tileInfo.type
    document.getElementById("houseCost").innerText = "Property Cost: £" + tileInfo.cost
    document.getElementById("houseRent").innerText = "Property Rent: £" + tileInfo.rent
    document.getElementById("upgradeCost").innerText = "Cost to upgrade: £"+tileInfo.houseCost
    let upgradeDiv = document.getElementById("houseUpgrades")
    if(tileInfo.houses != null){
      let houseVals = Object.values(tileInfo.houses)
      for(let i=0;i<houseVals.length;i++){
        let span = document.createElement("li")
        let type = ""
        if(i == houseVals.length - 1){
          span.innerText = "1 hotel yields rent of £" + houseVals[i]
        }else{
          span.innerText = i+1 + " house(s) yields rent of £" + houseVals[i]
        }
        upgradeDiv.appendChild(span)
      }
    }
  })
}())
