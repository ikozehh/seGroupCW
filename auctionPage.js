const electron = require('electron');
const {ipcRenderer} = require('electron');
(function(){

  var bidsBtn = document.getElementById("placeBidsBtn")
  bidsBtn.addEventListener("click", () => {
    let inputBoxes = document.querySelectorAll("input")
    let highestBid = 0
    let highestBidder = ""
    for(let input of inputBoxes){
      if(input.value == null){
        continue;
      }
      if(input.value > highestBid){
        highestBidder = input.id
        highestBid = input.value
      }
    }
    let bidName = highestBidder.split("-")[0]
    ipcRenderer.send("auctionPurchase", [bidName, highestBid])
  })

  ipcRenderer.on("loadAuctionData", (e,auctionData) => {
    let tileInfo = auctionData[0]
    document.getElementById("buyMessage").innerText = "Would you like to bid for this new property?"
    document.getElementById("houseName").innerText = "Property Name: "+tileInfo.name
    document.getElementById("houseType").innerText = "Property Type: " + tileInfo.type
    document.getElementById("houseCost").innerText = "Property Cost: " + tileInfo.cost
    document.getElementById("houseRent").innerText = "Property Rent: " + tileInfo.rent
    document.getElementById("upgradeCost").innerText = "Cost to upgrade: "+tileInfo.houseCost
    let upgradeDiv = document.getElementById("houseUpgrades")
    if(tileInfo.houses != null){
      let houseVals = Object.values(tileInfo.houses)
      for(let i=0;i<houseVals.length;i++){
        let span = document.createElement("li")
        let type = ""
        if(i == houseVals.length - 1){
          span.innerText = "1 hotel yields rent of " + houseVals[i]
        }else{
          span.innerText = i+1 + " house(s) yields rent of " + houseVals[i]
        }
        upgradeDiv.appendChild(span)
      }
    }
    let divIn = document.getElementById("inputOptions")
    for(let person of auctionData[1]){
      if(!person.passedGo){
        continue;
      }
      let inputBox = document.createElement("input")
      inputBox.type = "text"
      inputBox.id = person.name + "-input"
      let nameLabel = document.createElement("label")
      nameLabel.htmlFor = person.name + "-input"
      nameLabel.innerText = person.name
      divIn.appendChild(nameLabel)
      divIn.appendChild(inputBox)
    }
  })
}())
