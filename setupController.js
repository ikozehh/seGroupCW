const electron = require('electron');
const {ipcRenderer} = require('electron');
(function(){
  let selectBox = document.getElementById("numOfPlayersSelector")
  console.log(selectBox)
  selectBox.addEventListener("change", function(){
    let selectValue = selectBox.value
    if(selectValue == 2){
      document.getElementsByClassName("player3")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player4")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player5")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player6")[0].setAttribute("hidden", true)
    }else if(selectValue == 4){
      document.getElementsByClassName("player3")[0].removeAttribute("hidden")
      document.getElementsByClassName("player4")[0].removeAttribute("hidden")
      document.getElementsByClassName("player5")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player6")[0].setAttribute("hidden", true)
    }else if(selectValue == 3){
      document.getElementsByClassName("player3")[0].removeAttribute("hidden")
      document.getElementsByClassName("player4")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player5")[0].setAttribute("hidden", true)
      document.getElementsByClassName("player6")[0].setAttribute("hidden", true)
    }else if(selectValue == 5){
      document.getElementsByClassName("player3")[0].removeAttribute("hidden")
      document.getElementsByClassName("player4")[0].removeAttribute("hidden")
      document.getElementsByClassName("player5")[0].removeAttribute("hidden")
      document.getElementsByClassName("player6")[0].setAttribute("hidden", true)
    }else if(selectValue == 6){
      document.getElementsByClassName("player3")[0].removeAttribute("hidden")
      document.getElementsByClassName("player4")[0].removeAttribute("hidden")
      document.getElementsByClassName("player5")[0].removeAttribute("hidden")
      document.getElementsByClassName("player6")[0].removeAttribute("hidden")
    }
  })

  let submitBtn = document.getElementById("startGameBtn")
  submitBtn.addEventListener("click", function(){
    let numOfPlayers = document.getElementById("numOfPlayersSelector").value
    var playersArray = []
    for(let i =1; i<= numOfPlayers; i++){
      let radioBtns = document.getElementsByName(`p${i}t`)
      var token = ""
      for(let i=0; i<radioBtns.length; i++){
        if(radioBtns[i].checked){
          token = radioBtns[i].value
          break;
        }
      }
      playersArray.push({
        "Name": document.getElementById(`player${i}Name`).value,
        "Token": token
      })
    }
    console.log(playersArray)
    ipcRenderer.send("getPlayers", playersArray)
  })
})();
