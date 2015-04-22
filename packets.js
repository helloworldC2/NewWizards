function Packet(id){
  this.id = id;
}

Packet.prototype.getID = function(data){
  return data.slice(0,2);
};
Packet.prototype.readData = function(data){
  return data.slice(2,data.length);
};
Packet.prototype.writeData = function(){
  sendMessage(new Buffer (this.getData()));
};
///////////////////////////////////////////////////////////////////////////////
function Packet00Login(username,x,y,z){
  Packet.call(this,00);
  if(username!== "undefined")this.username = username;
  if(x!== "undefined")this.x = x;
  if(y!== "undefined")this.y = y;
  if(z!== "undefined")this.z = z;
}
Packet00Login.prototype.writeData = Packet.prototype.writeData;

Packet00Login.prototype.receivePacket = function(data){
  var stuff = data.toString().split(",");
  this.username = stuff[0].slice(2,stuff[0].length);
  this.x = stuff[1];
  this.y = stuff[2];
  this.z = stuff[3];
};
Packet00Login.prototype.getData = function(){
   return "00" + this.username+','+this.x+','+this.y+','+this.z;
 };
///////////////////////////////////////////////////////////////////////////////
 function Packet01Disconnect(username,x,y,z){
   Packet.call(this,01);
   if(username!== "undefined")this.username = username;
 }
 Packet01Disconnect.prototype.writeData = Packet.prototype.writeData;

 Packet01Disconnect.prototype.receivePacket = function(data){
   var stuff = data.toString().split(",");
   this.username = stuff[0].slice(2,stuff[0].length);

 };
 Packet01Disconnect.prototype.getData = function(){
    return "01" + this.username;
  };
///////////////////////////////////////////////////////////////////////////////
function Packet02Move(username,x,y,z,movingDir,isSwimming,inHand){
  Packet.call(this,02);
  if(username!== "undefined")this.username = username;
  if(x!== "undefined")this.x = x;
  if(y!== "undefined")this.y = y;
  if(z!== "undefined")this.z = z;
  if(movingDir!== "undefined")this.movingDir = movingDir;
  if(isSwimming!== "undefined")this.isSwimming = isSwimming;
  if(inHand!== "undefined")this.inHand = inHand;

}
Packet02Move.prototype.writeData = Packet.prototype.writeData;

Packet02Move.prototype.receivePacket = function(data){
  var stuff = data.toString().split(",");
  this.username = stuff[0].slice(2,stuff[0].length);
  this.x = parseInt(stuff[1]);
  this.y = parseInt(stuff[2]);
  this.z = parseInt(stuff[3]);
  this.movingDir = parseInt(stuff[4]);
  this.isSwimming = stuff[5];
  this.inHand = parseInt(stuff[6]);
};
Packet02Move.prototype.getData = function(){
   return "02" + this.username+','+this.x+','+this.y+','+this.z+
   ','+this.movingDir+','+this.isSwimming+','+this.inHand;
 };
 //////////////////////////////////////////////////////////////////////////////
 function TileEdit(x,y,z,id){
   this.x=x;
   this.y=y;
   this.z=z;
   this.id=id;
 }
 function Packet05SendTiles(seed,tiles){
   Packet.call(this,05);
   if(seed!== "undefined")this.seed = seed;
   if(tiles!== "undefined")this.tiles = tiles;
 }
 Packet05SendTiles.prototype.writeData = Packet.prototype.writeData;

 Packet05SendTiles.prototype.receivePacket = function(data){
   var stuff = data.toString().split(",");
   this.seed = stuff[0].slice(2,stuff[0].length);
   var blah = stuff[1].split(".");
   var t = [];
   for(var i=0;i<(blah.length-1)/4;i++){
      console.log("new Tile: "+blah[i*4]+','+blah[i*4+1]+','+blah[i*4+2]+','+blah[i*4+3]);
      t.push(new TileEdit(parseInt(blah[i*4]),parseInt(blah[i*4+1]),parseInt(blah[i*4+2]),parseInt(blah[i*4+3])));
  }
  this.tiles = t;

 };
 Packet05SendTiles.prototype.getData = function(){
    // var s = "";
    // for(var i=0;i<this.tiles.length;i++){
    //  var t = this.tiles[i];
    //  s+=t.x;
    //  s+=".";
    //  s+=t.y;
    //  s+=".";
    //  s+=t.z;
    //  s+=".";
    //  s+=t.id;
    //  s+=".";
    // }
    return "05" + this.seed;
  };

  /////////////////////////////////////////////////////////////////////////////
function Packet06UpdateTile(tile,x,y,z){
    Packet.call(this,06);
    if(tile!== "undefined")this.tile = tile;
    if(x!== "undefined")this.x = x;
    if(y!== "undefined")this.y = y;
    if(z!== "undefined")this.z = z;
  }
  Packet06UpdateTile.prototype.writeData = Packet.prototype.writeData;

  Packet06UpdateTile.prototype.receivePacket = function(data){
    var stuff = data.toString().split(",");
    this.tile = stuff[0].slice(2,stuff[0].length);
    this.x = parseInt(stuff[1]);
    this.y = parseInt(stuff[2]);
    this.z = parseInt(stuff[3]);

  };
  Packet06UpdateTile.prototype.getData = function(){
     return "06" + this.tile + ','+this.x+','+this.y+','+this.z;
   };
