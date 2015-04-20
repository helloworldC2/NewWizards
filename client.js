
var dgram = require('dgram');
var socket = dgram.createSocket("udp4");


//form elements
var ip = "127.0.0.1";
var port = 1331;
var loggedIn = false;
var isHost = false;
var players = [];
var numOfEntities = 0;
var username = "default";
function sendMessage(message) {
    socket.send(message, 0, message.length, port, ip);
    console.log("Sent: "+message);
}

function parsePacket(data, rinfo) {
    console.log("msg: "+data.toString());
    var packetType = data.slice(0,2);
    loggedIn = true;

    if(packetType=="00"){
      var loginP = new Packet00Login();
      loginP.receivePacket(data);
      if(loginP.username != username){
        for(var p=0;p<players.length;p++){
          if(p.username == loginP.username)return;
        }
        addPlayer(loginP.username,loginP.x,loginP.y,loginP.z);
      }else if(players.length<1){
          isHost = true;
          isRunning = true;
          level.generateLevel(Math.random());
          console.log("You are host!");
      }

    }else if(packetType=="01"){
      var disP = new Packet01Disconnect();
      disP.receivePacket(data);
      for(var i=0;i<players.length;i++){
        if(players[i].username==disP.username){
          players.splice(i, 1);
        }
      }
    }else if(packetType=="02"){
      var move = new Packet02Move();
      move.receivePacket(data);
      console.log("Move: "+move.getData());
      for(var i=0;i<players.length;i++){
        if(players[i].username==move.username){
          players[i].x = move.x;
          players[i].y = move.y;
          players[i].z = move.z;
          players[i].movingDir = move.movingDir;
          players[i].isSwimming = move.isSwimming;
          players[i].inHand = items[move.inHand];
        }
      }
    }else if(packetType=="05"){
        var sendTiles = new Packet05SendTiles();
        sendTiles.receivePacket(data);
        isRunning = true;
        level.generateLevel(sendTiles.seed);
        for(var i=0;i<sendTiles.tiles.length;i++){
          var t = sendTiles.tiles[i];
          console.log("Changing tile: "+t.x+","+t.y+","+t.z+","+t.id);
          level.tiles[t.z][t.x+(t.y*level.width)] = t.id;
        }
    }else if(packetType=="06"){
      var t = new Packet06UpdateTile();
      t.receivePacket(data);
      level.tiles[t.z][t.x+(t.y*level.width)] = t.tile;
    }

}
function sendTile(x,y,z,id){
  var updateTile = new Packet06UpdateTile(id,x,y,z);
  updateTile.writeData();
}
function sendSeed(seed){
  var sendTiles = new Packet05SendTiles(seed);
  sendTiles.writeData();
}
function addPlayer(username,x,y,z){
  players.push(new Player(username,x,y,z));
}
function movePlayer(player){
  var move = new Packet02Move(player.username,player.x,player.y,player.z,
    player.movingDir,player.isSwimming,player.inHand.id);
  move.writeData();
}
function login(player){
  username = player.username;
  var login = new Packet00Login(player.username,player.x,player.y,player.z);
  login.writeData();
}
function _listening() {
    var address = socket.address();
    console.log("socket listening " + address.address + ":" + address.port);

}
function _error(err) {
    console.log("error: " + err.stack);
    socket.close();
}
//more UDP stuffs
socket.on("error", _error);
socket.on("message", parsePacket);
socket.on("listening", _listening);
