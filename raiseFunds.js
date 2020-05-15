const electron = require('electron');
const {ipcRenderer} = require('electron');

(function(){
  var purchaseBtn = document.getElementById("buyUpgradesBtn")

  sellBtn.addEventListener("click", () => {
    let checkedBoxes = document.querySelectorAll("select")
    let upgradeObj = {}
    checkedBoxes.forEach((property) => {
      console.log(property)
      upgradeObj[property.className] = property.value
    })
    console.log(upgradeObj)
    ipcRenderer.send("sellOptionsChoose", upgradeObj)
  })

  ipcRenderer.on("sellOptions",(e,propertyInfo) => {
    let list = document.getElementById("houseList")
    for(let property of propertyInfo){
      let listElement = document.createElement("li")
      let selectBox = document.createElement("select")
      selectBox.className=property.houseName
      for(let i=0;i<property.numOfHouses + 1;i++){
        let opt = document.createElement("option")
        opt.innerText = i
        selectBox.appendChild(opt)
      }
      let houseCost = property.houseCost
      let houseName = property.name
      let houseCostSpan = document.createElement("span")
      let houseNameSpan = document.createElement("span")
      let containerDiv = document.createElement("div")
      containerDiv.className = "optionDiv"
      houseCostSpan.innerText = houseCost
      houseNameSpan.innerText = houseName
      numHousesSpan.innerText = numOfHouses
      containerDiv.appendChild(houseNameSpan)
      containerDiv.appendChild(houseCostSpan)
      containerDiv.appendChild(selectBox)
      listElement.appendChild(containerDiv)
      list.appendChild(listElement)

    }
  })


}())
