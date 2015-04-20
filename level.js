
function Level(width,height){
  this.width = width;
  this.height = height;
  this.ticks = 0;
  this.tiles  = [];
  this.data = [];
  this.entities =  [];
  this.seed = -1;
}
function drawLine(level,x0, x1, y0, y1,z,tile){
  var deltax = x1 - x0;
  var deltay = y1 - y0;
  var error = 0;
  try{
    var deltaerr = Math.abs(deltay / deltax);
  }catch(err){
    var deltaerr = 0;
  }

  var y = y0;
  for(var x=x0;x<x1;x++){
    level.tiles[z][x+(y*level.width)] = tile.id;
    error = error + deltaerr;
    while(error >= 0.5){
      level.tiles[z][x+(y*level.width)] = tile.id;
      var t = (y1 - y0);
      if(t>0){
        y++;
      }else{
        y--;
      }
      var dif = Math.random();
      if(dif>0.5){
        if(dif>0.6){
          x++;
        }else if(dif>0.7){
          x--;
        }else if(dif>0.8){
          y--;
        }else if(dif>0.9){
          y++;
        }
      }
      error = error - 1.0;
    }
  }
}
Level.prototype.generateLevel = function(seed){
  console.log("Generate Level");
  noise.seed(seed);
  this.seed = seed;
  Math.seedrandom(""+seed);
  this.tiles[0] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,4);
  var veins = [];
  while(veins.length<400)
          veins.push([Math.floor(Math.random()*this.width),Math.floor(Math.random()*this.height)]);
  for(var j=0;j<veins.length;j++){
    var i = veins[j];

    var end = [Math.floor((Math.random()*i[0])+30)-15,Math.floor((Math.random()*i[1])+30)-15];
    drawLine(this,i[0],end[0],i[1],end[1],0,tree);//change to ore
  }
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      var n = noise.perlin2(x/16, y/16);
      if(n>0)
        this.tiles[0][x+(y*this.width)] = water.id;//change to stone floor
    }
  }
  this.tiles[1] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,5);
  this.tiles[2] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,2);

  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      var n = noise.perlin2(x/25, y/25);
      if(n>0.033){
        this.tiles[2][x+(y*this.width)] = grass.id;
      }else if(n>0){
        this.tiles[2][x+(y*this.width)] = sand.id;
      }else{
        this.tiles[2][x+(y*this.width)] = water.id;
      }

    }
  }
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      if(this.getTile(x,y,2)!=grass)continue;
      var n = noise.perlin2(x/8, y/8);
      if(n>0)this.tiles[2][x+(y*this.width)] = tree.id;
    }
  }
  this.data[0] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,0);
  this.data[1] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,0);
  this.data[2] = Array.apply(null, new Array(this.width*this.height)).map(Number.prototype.valueOf,0);
  if(isMultiplayer&&isHost)sendSeed(seed);
};

Level.prototype.tick = function(){
  this.ticks++;
  for (var i = 0; i < this.entities.length; i++) {
    if(this.entities[i].z==player.z)this.entities[i].tick();
  }
  for (var i = 0; i < tile.length; i++) {
    tile[i].tick();
  }

};

Level.prototype.render = function(xoff,yoff){
  var xmin,xmax,ymin,ymax;
  if(xoff<1){
    xmin=0;
    xmax = 40;
  }else{
    xmin = (player.x>>5)-20 < 0 ? 0 : (player.x>>5)-20;
    xmax = (player.x>>5)+21 > this.width ? this.width : (player.x>>5)+21;
  }
  if(yoff<1){
    ymin=0;
    ymax = 23;
  }else{
    ymin = (player.y>>5)-12 < 0 ? 0 : (player.y>>5)-12;
    ymax = (player.y>>5)+13 > this.height ? this.height : (player.y>>5)+13;
  }

  for (var x = xmin; x < xmax; x++) {
    for (var y = ymin; y < ymax; y++) {
      var z = player.z;

      while(!this.getTile(x,y,z).id)z--;
      // var isVisable = false;
      // for(var i=0;i<9;i++){
      //   if(i==4)continue;
      //   var dx = (i%3)-1;
      //   var dy = Math.floor(i/3)-1;
      //   if(!this.getTile(x+dx,y+dy,z).isSolid){
      //     isVisable = true;
      //     continue;
      //   }
      // }
      // if(!isVisable)continue;
      if(z==player.z){
        this.getTile(x,y,z).render((x<<5)-xoff,(y<<5)-yoff,this.getData(x,y,z));
      }else{
        this.getTile(x,y,z).render((x<<5)-xoff,(y<<5)-yoff-16,this.getData(x,y,z));
        this.getTile(x,y+1,z).render((x<<5)-xoff,(y+1<<5)-yoff-16,this.getData(x,y,z));
        for (var i = 0; i < this.entities.length; i++) {
          if(this.entities[i].z==z)this.entities[i].render(xoff,yoff+16,this.getData(x,y,z));
        }
        this.getTile(x,y-1,player.z).render((x<<5)-xoff,(y-1<<5)-yoff,this.getData(x,y,z));
      }
      for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].z==player.z)this.entities[i].render(xoff,yoff);
      }
    }
  }
};

Level.prototype.setTile = function(x,y,z,tile){
  if(x < 0 || y < 0 || x >= this.width || y >= this.height)return;
  this.tiles[z][x+(y*this.width)] = tile.id;
  if(isMultiplayer)sendTile(x,y,z,tile.id);
};
Level.prototype.incrementData = function(x,y,z,d){
  if(x < 0 || y < 0 || x >= this.width || y >= this.height)return;
  this.data[z][x+(y*this.width)]+= d;

};

Level.prototype.getTile = function(x,y,z){
  if(x < 0 || y < 0 || x >= this.width || y >= this.height || z<0)return VOID;
  return tile[this.tiles[z][x+(y*this.width)]];

};
Level.prototype.getData = function(x,y,z){
  if(x < 0 || y < 0 || x >= this.width || y >= this.height || z<0)return -1;
  return this.data[z][x+(y*this.width)];

};

Level.prototype.canPassTile = function(tile,x,y,entity){
  if(tile.isSolid)return false;
  for (var e = 0; e < this.entities.length; e++) {
    var i = this.entities[i];
    if(i.x>>5 == x && i.y>>5 ==y && i.blocksPath)return false;

  }
  return true;
}
