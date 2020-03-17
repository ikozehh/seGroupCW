const electron = require('electron');
const {ipcRenderer} = require('electron');
const sort = require("fast-sort");
var boardGame;
var bankMoney = 50000
const housesForTiles = [{
  "Name":"Crapper Street",
  "Group":"Brown",
  "Cost":60,
  "Rent":2,
  "Position":2
},{
  "Name":"Gangsters Paradise",
  "Group":"Brown",
  "Cost":60,
  "Rent":4,
  "Position":4
},{
  "Name":"Brighton Station",
  "Group":"Station",
  "Cost":200,
  "Position":6
},{
  "Name":"Weeping Angel",
  "Group":"Blue",
  "Cost":100,
  "Position":7,
  "Rent":6
},{
  "Name":"Potts Avenue",
  "Group":"Blue",
  "Cost":100,
  "Position":9,
  "Rent":6
},{
  "Name":"Nardole Drive",
  "Group":"Blue",
  "Cost":120,
  "Position":10,
  "Rent":8
},{
  "Name":"Skywalker Drive",
  "Group":"Purple",
  "Cost":140,
  "Position":12,
  "Rent":10
},{
  "Name":"Tesla Power Co",
  "Group":"Utilities",
  "Cost":150,
  "Position":13
},{
  "Name":"Wookie Hole",
  "Group":"Purple",
  "Cost":140,
  "Position":14,
  "Rent":10
},{
  "Name":"Rey Lane",
  "Group":"Purple",
  "Cost":160,
  "Position":15,
  "Rent":12
},{
  "Name":"Hove Station",
  "Group":"Station",
  "Cost":200,
  "Position":16
},{
  "Name":"Cooper Drive",
  "Group":"Orange",
  "Cost":180,
  "Position":17,
  "Rent":14
},{
  "Name":"Wolowitz Street",
  "Group":"Orange",
  "Cost":180,
  "Position":19,
  "Rent":14
},{
  "Name":"Penny Lane",
  "Group":"Orange",
  "Cost":200,
  "Position":20,
  "Rent":16
}, {
  "Name":"Yue Fei Square",
  "Group":"Red",
  "Cost":220,
  "Position":22,
  "Rent":18
},{
  "Name":"Mulan Rouge",
  "Group":"Red",
  "Cost":220,
  "Position":24,
  "Rent":18
},{
  "Name":"Han Xin Gardens",
  "Group":"Red",
  "Cost":240,
  "Position":25,
  "Rent":20
},{
  "Name":"Falmer Station",
  "Group":"Station",
  "Cost":200,
  "Position":26
},{
  "Name":"Kirk Close",
  "Group":"Yellow",
  "Cost":260,
  "Position":27,
  "Rent":22
},{
  "Name":"Picard Avenue",
  "Group":"Yellow",
  "Cost":260,
  "Position":28,
  "Rent":22
},{
  "Name":"Edison Water",
  "Group":"Utilities",
  "Cost":150,
  "Position":29
},{
  "Name":"Crusher Creek",
  "Group":"Yellow",
  "Cost":280,
  "Position":30,
  "Rent":22
},{
  "Name":"Sirat Mews",
  "Group":"Green",
  "Cost":300,
  "Position":32,
  "Rent":26
},{
  "Name":"Ghengis Crescent",
  "Group":"Green",
  "Cost":300,
  "Position":33,
  "Rent":26
},{
  "Name":"Ibis Close",
  "Group":"Green",
  "Cost":320,
  "Position":35,
  "Rent":28
},{
  "Name":"Lewes Station",
  "Group":"Station",
  "Cost":200,
  "Position":36
},{
  "Name":"Hawking Way",
  "Group":"Deep Blue",
  "Cost":350,
  "Position":38,
  "Rent":35
},{
  "Name":"Turing Heights",
  "Group": "Deep Blue",
  "Cost":400,
  "Position":40,
  "Rent":50
}]
const restOfTiles = [{
  "Name":"Go",
  "HasAction":true,
  "Action":"Collect £20",
  "Position":1
},{
  "Name":"Pot Luck",
  "HasAction":true,
  "Action":"Take Card",
  "Position":3
},{
  "Name":"Income Tax",
  "HasAction":true,
  "Action":"Pay £200",
  "Position":5
},{
  "Name":"Opportunity Knocks",
  "HasAction":true,
  "Action":"Take Card",
  "Position":8
},{
  "Name":"Jail/Just Visiting",
  "HasAction":false,
  "Position":11
},{
  "Name":"Pot Luck",
  "HasAction":true,
  "Action":"Take Card",
  "Position":18
},{
  "Name":"Free Parking",
  "HasAction":true,
  "Action":"Collect Fines",
  "Position":21
},{
  "Name":"Opportunity Knocks",
  "HasAction":true,
  "Action":"Take Card",
  "Position":23
},{
  "Name":"Go To Jail",
  "HasAction":true,
  "Action":"Go To Jail",
  "Position":31
},{
  "Name":"Pot Luck",
  "HasAction":true,
  "Action":"Take Card",
  "Position":34
},{
  "Name":"Opportunity Knocks",
  "HasAction":true,
  "Action":"Take Card",
  "Position":37
},
{
  "Name":"Super Tax",
  "HasAction":true,
  "Action":"Pay £100",
  "Position":39
}]
ipcRenderer.on("sendPlayersInitGame", function(e, args){
  console.log("Received request from main process to start")
  console.log(args)
  let playersList = document.getElementById("playerNamesVisual")
  for (let i=0; i< args.length; i++){
    let listEl = document.createElement("LI")
    listEl.innerText = args[i].Name
    playersList.append(listEl)
  }
  let listOfPlayers = []
  for (let i=0; i<args.length; i++){
    listOfPlayers.push(new Player(args[i].Token, args[i].Name, 0, {}, false))
  }
  //constructor(position, type, name, owner, canBuy, isOwned, hasAction, action,cost, rent, houses)
  console.log(listOfPlayers)
  let listOfTiles = []
  for (let i=0; i<housesForTiles.length;i++){
    listOfTiles.push(new Tile(housesForTiles[i].Position,housesForTiles[i].Group,housesForTiles[i].Name,null,true,false,false,null,housesForTiles[i].Cost,housesForTiles[i].Rent, null))
  }
  for (let i=0; i<restOfTiles.length;i++){
    listOfTiles.push(new Tile(restOfTiles[i].Position,"tile",restOfTiles[i].Name,null,false,false,restOfTiles[i].HasAction,housesForTiles[i].Action,null,null,null))
  }
  let sortedBoard = sort(listOfTiles).asc(u => u.position)
  console.log(sortedBoard)
  boardGame = new Board(listOfPlayers, sortedBoard)
  console.log(boardGame)

  let rollDiceBtn = document.getElementById("rollDiceBtn")
  rollDiceBtn.addEventListener("click", () => {
    boardGame.rollDiceMovePlayer()
    console.log(boardGame)
  })
})
class Board {
  tiles = [];
  players = []
  currentPlayer;
  numOfPlayers;
  constructor(players, tiles) {
    this.players = players
    this.currentPlayer = players[0]
    this.currentPlayerNum = 0
    this.currentPlayer.setIsTurn(true)
    this.numOfPlayers = players.length
    this.tiles = tiles
  }

  // get currentPlayer(){
  //   return this.currentPlayer
  // }
  updateCurrentPlayer(){
    if(this.currentPlayerNum != this.numOfPlayers - 1){
      this.currentPlayerNum = this.currentPlayerNum + 1
      this.players[this.currentPlayerNum-1].setIsTurn(false)
    }else{
      this.currentPlayerNum = 0
      this.players[this.numOfPlayers - 1].setIsTurn(false)
    }
    this.currentPlayer = this.players[this.currentPlayerNum]
    this.currentPlayer.setIsTurn(true)
  }

  rollDiceMovePlayer(){
    let diceResult = this.currentPlayer.rollDice()
    let newPosition = this.currentPlayer.updatePosition(diceResult)
    if(this.tiles[newPosition].isSafeSpace(this.currentPlayer)){
      this.updateCurrentPlayer()
    }else{
      this.tiles[newPosition].chargePlayer(this.currentPlayer)
      this.updateCurrentPlayer()
    }

  }
}

//On Dice roll click - call this function


class Player {
  token; //string
  position; //int
  money; //int
  properties; //array of tile objects
  isTurn; //boolean
  doubleCount; //int
  passedGo; //boolean
  name;

  constructor(token,name, position, properties,isTurn){
    this.token = token;
    this.name = name;
    this.position = position;
    this.money = 1500;
    this.properties = properties;
    this.isTurn = isTurn;
    this.doubleCount = 0;
    this.passedGo = false;
  }

  spendMoney(amount){
    console.log("Spending")
    console.log(amount)
    this.money = this.money - amount
    console.log(this.money)
  }

  receiveMoney(amount){
    this.money = this.money + amount
  }

  getMoney(){
    return this.money
  }
  setIsTurn(turn){
    this.isTurn = turn
  }

  getName(){
    return this.name
  }

  rollDice(){
    let min = 1;
    let max = 6;
    let roll_1 = Math.floor(Math.random() * (max - 1)) + 1;
    let roll_2 = Math.floor(Math.random() * (max - 1)) + 1;
    if (roll_1 == roll_2){
      this.doubleCount++;
      if(this.doubleCount >= 3){
        this.isTurn = false;
        // go to jail
      }
    }
    return roll_1 + roll_2
  }

  updatePosition(extra){
    this.position = this.position + extra
    return this.position
  }

  ownedProperties(){
    return
  }
}

class Property {
  constructor(){

  }
}

class Tile{
  position; //int
  type; //string
  name; //string
  owner; //string
  canBuy;//bool
  isOwned; //bool
  hasAction; //bool
  cost; //int
  rent; //int
  houses; //int
  constructor(position, type, name, owner, canBuy, isOwned, hasAction, cost, rent, houses){
    this.position = position;
    this.type = type;
    this.name = name;
    this.owner = null;
    this.canBuy = canBuy;
    this.isOwned = isOwned;
    this.hasAction = hasAction;
    this.cost = cost;
    this.rent = rent;
    this.houses = houses;
  }

  getType(){
    return this.type
  }

  getName(){
    return this.name
  }

  isSafeSpace(player){
    let playerName = player.getName()
    if (this.isOwned || this.hasAction){
      return false
    }else{
      return true
    }
  }

  chargePlayer(player){
    player.spendMoney(this.rent)
    console.log("Charging player")
    if(this.type != "tile"){
      this.owner.receiveMoney(this.rent)
    }else{
      bankMoney = bankMoney + this.rent
      //updateBankMoneyFrontend()
    }

  }

  buy(){
    if(this.canBuy && !this.isOwned){
      //buy property
    }else{
      console.log("Property cannot be bought")
    }
  }
}
