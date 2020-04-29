const electron = require('electron');
const {ipcRenderer} = require('electron');
const sort = require("fast-sort");
var boardGame;
var bankMoney = 50000
var parkingFinesMoney = 0;
const housesForTiles = [{
  "Name":"Crapper Street",
  "Group":"Brown",
  "Cost":60,
  "Rent":2,
  "Position":2,
  "houses":{
    1:10,
    2:30,
    3:90,
    4:160,
    "hotel":250
  }
},{
  "Name":"Gangsters Paradise",
  "Group":"Brown",
  "Cost":60,
  "Rent":4,
  "Position":4,
  "houses":{
    1:20,
    2:60,
    3:180,
    4:320,
    "hotel":450
  }
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
  "Rent":6,
  "houses":{
    1:30,
    2:90,
    3:270,
    4:400,
    "hotel":550
  }
},{
  "Name":"Potts Avenue",
  "Group":"Blue",
  "Cost":100,
  "Position":9,
  "Rent":6,
  "houses":{
    1:30,
    2:90,
    3:270,
    4:400,
    "hotel":550
  }
},{
  "Name":"Nardole Drive",
  "Group":"Blue",
  "Cost":120,
  "Position":10,
  "Rent":8,
  "houses":{
    1:40,
    2:100,
    3:300,
    4:450,
    "hotel":600
  }
},{
  "Name":"Skywalker Drive",
  "Group":"Purple",
  "Cost":140,
  "Position":12,
  "Rent":10,
  "houses":{
    1:50,
    2:150,
    3:450,
    4:625,
    "hotel":750
  }
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
  "Rent":10,
  "houses":{
    1:50,
    2:150,
    3:450,
    4:625,
    "hotel":750
  }
},{
  "Name":"Rey Lane",
  "Group":"Purple",
  "Cost":160,
  "Position":15,
  "Rent":12,
  "houses":{
    1:60,
    2:180,
    3:500,
    4:700,
    "hotel":900
  }
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
  "Rent":14,
  "houses":{
    1:70,
    2:200,
    3:550,
    4:750,
    "hotel":950
  }
},{
  "Name":"Wolowitz Street",
  "Group":"Orange",
  "Cost":180,
  "Position":19,
  "Rent":14,
  "houses":{
    1:70,
    2:200,
    3:550,
    4:750,
    "hotel":950
  }
},{
  "Name":"Penny Lane",
  "Group":"Orange",
  "Cost":200,
  "Position":20,
  "Rent":16,
  "houses":{
    1:80,
    2:220,
    3:600,
    4:800,
    "hotel":1000
  }
}, {
  "Name":"Yue Fei Square",
  "Group":"Red",
  "Cost":220,
  "Position":22,
  "Rent":18,
  "houses":{
    1:90,
    2:250,
    3:700,
    4:875,
    "hotel":1050
  }
},{
  "Name":"Mulan Rouge",
  "Group":"Red",
  "Cost":220,
  "Position":24,
  "Rent":18,
  "houses":{
    1:90,
    2:250,
    3:700,
    4:875,
    "hotel":1050
  }
},{
  "Name":"Han Xin Gardens",
  "Group":"Red",
  "Cost":240,
  "Position":25,
  "Rent":20,
  "houses":{
    1:100,
    2:300,
    3:750,
    4:925,
    "hotel":1100
  }
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
  "Rent":22,
  "houses":{
    1:110,
    2:330,
    3:800,
    4:975,
    "hotel":1150
  }
},{
  "Name":"Picard Avenue",
  "Group":"Yellow",
  "Cost":260,
  "Position":28,
  "Rent":22,
  "houses":{
    1:110,
    2:330,
    3:800,
    4:975,
    "hotel":1150
  }
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
  "Rent":22,
  "houses":{
    1:120,
    2:360,
    3:850,
    4:1025,
    "hotel":1200
  }
},{
  "Name":"Sirat Mews",
  "Group":"Green",
  "Cost":300,
  "Position":32,
  "Rent":26,
  "houses":{
    1:130,
    2:390,
    3:900,
    4:1100,
    "hotel":1275
  }
},{
  "Name":"Ghengis Crescent",
  "Group":"Green",
  "Cost":300,
  "Position":33,
  "Rent":26,
  "houses":{
    1:130,
    2:390,
    3:900,
    4:1100,
    "hotel":1275
  }
},{
  "Name":"Ibis Close",
  "Group":"Green",
  "Cost":320,
  "Position":35,
  "Rent":28,
  "houses":{
    1:150,
    2:450,
    3:1000,
    4:1200,
    "hotel":1400
  }
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
  "Rent":35,
  "houses":{
    1:175,
    2:500,
    3:1100,
    4:1300,
    "hotel":1500
  }
},{
  "Name":"Turing Heights",
  "Group": "Deep Blue",
  "Cost":400,
  "Position":40,
  "Rent":50,
  "houses":{
    1:200,
    2:600,
    3:1400,
    4:1700,
    "hotel":2000
  }
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
  "Position":5,
  "Rent":200

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
  "Position":39,
  "Rent":100
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
    listOfPlayers.push(new Player(args[i].Token, args[i].Name, 1, {}, false))
  }
  //constructor(position, type, name, owner, canBuy, isOwned, hasAction, action,cost, rent, houses)
  console.log(listOfPlayers)
  let listOfTiles = []
  for (let i=0; i<housesForTiles.length;i++){             //position, type, name, owner, canBuy, isOwned, hasAction, cost, rent,houses)
    listOfTiles.push(new Tile(housesForTiles[i].Position,housesForTiles[i].Group,housesForTiles[i].Name,null,true,false,false,null,housesForTiles[i].Cost,housesForTiles[i].Rent, housesForTiles[i].houses))
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
    //console.log(boardGame)
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
    console.log(this.tiles)
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
    console.log(this)
    this.currentPlayer.setIsTurn(true)
  }

  async rollDiceMovePlayer(){
    if(this.currentPlayer.isInJail()){
      incrementMissedRoundsAndHandleJail();
      this.updateCurrentPlayer()
      return
    }
    let diceResult = this.currentPlayer.rollDice()
    let newPosition = this.currentPlayer.updatePosition(diceResult)
    if(this.tiles[newPosition - 1].isSafeSpace(this.currentPlayer)){
      if(this.tiles[newPosition - 1].canBeBought(this.currentPlayer)){
        ipcRenderer.send("letBuy", this.tiles[newPosition - 1].getBuyInfo())
        let buyHouse = await new Promise((res,rej) => {
          ipcRenderer.on("purchasePropertyRen",(e,buy) => {
            res(buy)
          })
        })
        if(buyHouse){
          this.tiles[newPosition - 1].buy(this.currentPlayer)
          this.updateCurrentPlayer()
        }else{
          this.updateCurrentPlayer()
        }
      }else if(this.tiles[newPosition - 1].hasActions()){
        this.handleAction(this.tiles[newPosition - 1])
      }else{
        this.updateCurrentPlayer()
      }
    }else{
      this.tiles[newPosition - 1].chargePlayer(this.currentPlayer)
      this.updateCurrentPlayer()
    }
    this.currentPlayer.offerUpgrades()

  }

  takeCard(){

  }


  collectFines(){

  }

  payTax(amount){
    this.currentPlayer.spendMoney(amount)
    bankMoney = bankMoney + amount
    ipcRenderer.send("infoMessage", "You have had to pay a tax of " + amount + " to the bank")
  }

  handleAction(tile){
    let actionString = tile.getAction()
    if(actionString == "Take Card"){
      this.takeCard()
    }else if(actionString == "Go To Jail"){
      this.currentPlayer.goToJail()
    }else if(actionString == "Collect Fines"){
      this.currentPlayer.collectFines()
    }else if(actionString.split(" ")[0] == "Pay"){
      this.payTax(actionString.split("£")[1])
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
  inJail;
  missedRounds;

  constructor(token,name, position, properties,isTurn){
    this.token = token;
    this.name = name;
    this.position = position;
    this.money = 1500;
    this.properties = properties;
    this.isTurn = isTurn;
    this.doubleCount = 0;
    this.passedGo = false;
    this.inJail = false;
    this.missedRounds = -1
  }

  spendMoney(amount){
    console.log("Player " + this.name + " is spending " + amount)
    this.money = this.money - amount
    console.log("Spent money, money left: " + this.money)
  }

  receiveMoney(amount){
    console.log("Player " + this.name + " is receiving " + amount)
    this.money = this.money + amount
    console.log("Received money, money left: " + this.money)

  }

  isInJail(){
    return this.inJail;
  }

  incrementMissedRoundsAndHandleJail(){
    this.missedRounds++
    if(this.missedRounds == 2){
      ipcRenderer.send("infoMessage", "You have now left jail "+this.name+", you will have a turn next round")
      this.missedRounds = -1
      this.inJail = false;
    }
  }

  offerUpgrades(){

  }

  collectFines(){
    this.receiveMoney(parkingFinesMoney)
    ipcRenderer.send("infoMessage", "You have collected all the parking fines money which was £"+parkingFinesMoney)
    parkingFinesMoney = 0;
  }

  async goToJail(){
    this.position = 11
    this.inJail = true
    ipcRenderer.send("goJail")
    let leaveJail = await new Promise((res,rej) => {
      ipcRenderer.on("leaveJailRen", (e,leave) => {
        res(leave)
      })
    })
    if(leaveJail){
      if(this.money >= 50){
        parkingFinesMoney = parkingFinesMoney + 50
        this.inJail = false;
      }else{
        ipcRenderer.send("infoMessage", "You do not have enough money to leave jail you must stay for 2 rounds and not collect rent")
        this.missedRounds++
      }
    }else{
      ipcRenderer.send("infoMessage", "You have chosen to stay in jail, you won't collect rent and will miss 2 go's")
      this.missedRounds++
    }
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

  setPosition(pos){
    this.position = pos
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
        this.position = 11
      }
    }
    return roll_1 + roll_2
  }

  updatePosition(extra){
    console.log(this.position)
    console.log(extra)
    if(this.position + extra <= 40){
      this.position = this.position + extra
    }else{
      this.position = (this.position + extra) - 40
      this.passedGo = true
      this.receiveMoney(200)
    }
    console.log(this.position)

    return this.position

  }

  getPassedGo(){
    return this.passedGo
  }

  ownedProperties(){
    return this.properties
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
  action; //string
  cost; //int
  rent; //int
  houses; //int
  constructor(position, type, name, owner, canBuy, isOwned, hasAction, action,cost, rent,houses){
    this.position = position;
    this.type = type;
    this.name = name;
    this.owner = null;
    this.canBuy = canBuy;
    this.isOwned = isOwned;
    this.hasAction = hasAction;
    this.action = action
    this.cost = cost;
    this.rent = rent;
    this.houses = houses;
    this.numOfHouses = -1
  }

  getType(){
    return this.type
  }

  getName(){
    return this.name
  }
  canBeBought(player){
    return this.canBuy && (!this.isOwned || this.owner == player) && player.getPassedGo()
  }

  getBuyInfo(){
    return {
      "type":this.type,
      "name":this.name,
      "cost":this.cost,
      "rent":this.rent,
      "houses":this.houses,
      "houseCost":this.getHouseCost(),
      "owner":this.owner
    }
  }

  getAction(){
    return this.action
  }

  hasActions(){
    return this.hasAction
  }

  getHouseCost(){
    if(this.type == "Brown" || this.type == "Blue"){
      return 50
    }else if(this.type == "Purple" || this.type == "Orange"){
      return 100
    }else if(this.type == "Red" || this.type == "Yellow"){
      return 150
    }else if(this.type == "Green" || this.type == "Deep Blue"){
      return 200
    }
  }

  isSafeSpace(player){
    let playerName = player.getName()
    if (this.isOwned || this.hasAction){
      if(this.isOwned){
        if(this.owner.isInJail()){
          return true;
        }
      }
      return false
    }else{
      return true
    }
  }

  chargePlayer(player){
    if(this.type != "tile"){
      player.spendMoney(this.rent)
      this.owner.receiveMoney(this.rent)
    }else{
      if(this.action == "Pay"){
        player.spendMoney(this.rent)
        bankMoney = bankMoney + this.rent
      }    //updateBankMoneyFrontend()
    }

  }

  buy(player){
    if(this.owner != player){
      if (player.getMoney() >= this.cost){
        console.log("Buying new propert")
          this.owner = player
          player.spendMoney(this.cost)
          bankMoney = bankMoney + this.cost
          this.numOfHouses++
          ipcRenderer.send("sendInfo", "You have bought the property")
      }else{
        console.log("Not enough money")
      }
    }else{
      if(player.getMoney() >= this.getHouseCost()){
        console.log("Buying new house")
        this.numOfHouses++
        player.spendMoney(this.getHouseCost())
        bankMoney = bankMoney + this.getHouseCost()
        if(this.numOfHouses >4){
          this.rent = this.houses["hotel"]
        }else{
          this.rent = this.houses[this.numOfHouses]
        }
      }else{
        console.log("Not enough money")
      }

    }

  }
}
