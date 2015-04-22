function Item(iD,name,image,stackSize){
  this.name = name;
  this.id = iD;
  this.image = image;
  this.stackSize = stackSize
  items.push(this);

}

Item.prototype.render = function(x,y){
  context.drawImage(this.image, x, y,16,16);
};
Item.prototype.use = function(x,y,z){
  var t = level.getTile(x,y,z);
  if(t.isSolid||t.id==this.id)return;
  if(t == AIR)level.setTile(x,y,z,tile[this.id]);
  if(!t.isSolid&&t != AIR)level.setTile(x,y,z,tile[this.id+14]);//offset to solid version

  
  player.inventory.removeItem(this);
};



function ItemSpade(id,name,image,power){
  Item.call(this,id,name,image,1);
  this.power = power;
  this.durability = power*10;
}
ItemSpade.prototype.render = Item.prototype.render;

ItemSpade.prototype.use = function(x,y,z){
  var tile = level.getTile(x,y,z);
  if(tile.tool=="spade"){
    //console.log("Set tile at"+x+","+y+"z"+z+" to "+AIR);
    level.incrementData(x,y,z,this.power+Math.floor((Math.random()*8)-4));
    if(level.getData(x,y,z)>20){
      level.setTile(x,y,z,AIR);
      for(var i=0;i<9;i++){
        var dx = (i%3)-1;
        var dy = Math.floor(i/3)-1;
        if(level.getTile(x+dx,y+dy,z-1).isSolid){
          level.setTile(x+dx,y+dy,z-1,ladder);
        }
      }
      level.setTile(x,y-1,z-1,steps);
      var dirt = new EntityItem(items[tile.id],x<<5,y<<5,z,(Math.random()*2)-1);
      this.durability--;
      if(this.durability<0)player.inventory.removeItem(this);
    }
  }
};
function ItemAxe(id,name,image,power){
  Item.call(this,id,name,image,1);
  this.power = power;
  this.durability = power*10;
}
ItemAxe.prototype.render = Item.prototype.render;

ItemAxe.prototype.use = function(x,y,z){
  var tile = level.getTile(x,y,z);
  if(tile.tool=="axe"){
    //console.log("Set tile at"+x+","+y+"z"+z+" to "+AIR);
    llevel.incrementData(x,y,z,this.power+Math.floor((Math.random()*8)-4));
    if(level.getData(x,y,z)>20){
      level.setTile(x,y,z,AIR);
      for(var i=0;i<9;i++){
        var dx = (i%3)-1;
        var dy = Math.floor(i/3)-1;
        if(level.getTile(x+dx,y+dy,z-1).isSolid){
          level.setTile(x+dx,y+dy,z-1,ladder);
        }
      }

      level.setTile(x,y-1,z-1,steps);
      var dirt = new EntityItem(itemDirt,x<<5,y<<5,z,(Math.random()*2)-1);
      this.durability--;
      if(this.durability<0)player.inventory.removeItem(this);
    }
  }
};

function ItemPickAxe(id,name,image,power){
  Item.call(this,id,name,image,1);
  this.power = power;
  this.durability = power*10;
}
ItemPickAxe.prototype.render = Item.prototype.render;

ItemPickAxe.prototype.use = function(x,y,z){
  var tile = level.getTile(x,y,z);
  if(tile.tool=="axe"){
    //console.log("Set tile at"+x+","+y+"z"+z+" to "+AIR);
    level.incrementData(x,y,z,this.power+Math.floor((Math.random()*8)-4));
    if(level.getData(x,y,z)>20){
      level.setTile(x,y,z,AIR);
      for(var i=0;i<9;i++){
        var dx = (i%3)-1;
        var dy = Math.floor(i/3)-1;
        if(level.getTile(x+dx,y+dy,z-1).isSolid){
          level.setTile(x+dx,y+dy,z-1,stoneFloor);
        }
      }

      level.setTile(x,y-1,z-1,steps);
      var dirt = new EntityItem(itemDirt,x<<5,y<<5,z,(Math.random()*2)-1);
      this.durability--;
      if(this.durability<0)player.inventory.removeItem(this);
    }
  }
};


function ItemBucket(id,name,image,power){
  Item.call(this,id,name,image,1);
  this.power = power;
  this.durability = power*10;
}
ItemBucket.prototype.render = Item.prototype.render;

ItemBucket.prototype.use = function(x,y,z){
  var tile = level.getTile(x,y,z);
  if(tile.tool=="axe"){
    //console.log("Set tile at"+x+","+y+"z"+z+" to "+AIR);
    level.incrementData(x,y,z,this.power+Math.floor((Math.random()*8)-4));
    if(level.getData(x,y,z)>20){
      level.setTile(x,y,z,AIR);
      for(var i=0;i<9;i++){
        var dx = (i%3)-1;
        var dy = Math.floor(i/3)-1;
        if(level.getTile(x+dx,y+dy,z-1).isSolid){
          level.setTile(x+dx,y+dy,z-1,stoneFloor);
        }
      }

      level.setTile(x,y-1,z-1,steps);
      var dirt = new EntityItem(itemWater,x<<5,y<<5,z,(Math.random()*2)-1);
      this.durability--;
      if(this.durability<0)player.inventory.removeItem(this);
    }
  }
};
function ItemFist(id,name,image,power){
  Item.call(this,id,name,image,1);
  this.power = power;
  this.durability = 1000000;
}
ItemFist.prototype.render = Item.prototype.render;

ItemFist.prototype.use = function(x,y,z){
  var tile = level.getTile(x,y,z);
  if(tile.tool=="spade"){
    //console.log("Set tile at"+x+","+y+"z"+z+" to "+AIR);
    level.incrementData(x,y,z,this.power+Math.floor((Math.random()*this.power)));
    if(level.getData(x,y,z)>20){
		if(tile.isSolid){ 
			level.setTile(x,y,z,Dirt)
			}else{
				level.setTile(x,y,z,AIR)
				};
      for(var i=0;i<9;i++){
        var dx = (i%3)-1;
        var dy = Math.floor(i/3)-1;
        if(level.getTile(x+dx,y+dy,z-1).isSolid ){
          level.setTile(x+dx,y+dy,z-1,stoneFloor);
        }
      }
      level.setTile(x,y-1,z-1,steps);
      var dirt = new EntityItem(items[tile.id],x<<5,y<<5,z,(Math.random()*2)-1);
      this.durability--;
      if(this.durability<0)player.inventory.removeItem(this);
    }
  }
  ///////////!!!!INSERT ALL COMLETED TOOL FUNCTIONS INTO HERE!!!!!!\\\\\\\\\\\
};
var items = [];
var itemSand = new Item(0,"spade",sandImg);
var itemLog = new Item(1,"spade",logsImg);
var itemDirt = new Item(2,"spade",dirtImg,4);
var itemWater = new Item(3,"bucket",waterImg);
var woodenSpade = new ItemSpade(4,"Wooden Spade",spadeImg,5);
var woodenAxe = new ItemAxe(5,"Wooden axe",sandImg,5);
var woodenPickAxe = new ItemPickAxe(6,"Wooden Pickaxe",sandImg,5);
var Bucket = new ItemBucket(7,"bucket",sandImg,5);
var fist = new ItemFist(8,"Just your hand",fistImg,9);
