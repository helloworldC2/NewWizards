function Tile(id,image,tool) {
  this.image = image;
  this.isSolid = false;
  this.id = id;
  this.mCost = 1.0;
  this.children = [];
  this.tool = tool;
  console.log("this: "+this);
  //this.drop = drop;
  tile.push(this);
}

Tile.prototype.tick = function () {
};
Tile.prototype.render = function (x,y,dmg) {
  if(this.id>1)context.drawImage(this.image, x, y,32,32);;
  if(dmg>20){
    context.drawImage(grass, x, y,32,32);
  }else if(dmg>18){
	  context.drawImage(dmg5Img, x, y,32,32);
  }else if(dmg>16){
	  context.drawImage(dmg5Img, x, y,32,32);
  }else if(dmg>12){
	  context.drawImage(dmg4Img, x, y,32,32);
  }else if(dmg>8){
	  context.drawImage(dmg3Img, x, y,32,32);
  }else if(dmg>5){
    context.drawImage(dmg2Img, x, y,32,32);
  }else if(dmg>2){
    context.drawImage(dmg1Img, x, y,32,32);
  }

};
Tile.prototype.setSolid = function (solid) {
  this.isSolid = solid;
  return this;
};
Tile.prototype.setmCost = function (mCost) {
  this.mCost = mCost;
  return this;
};
Tile.prototype.getID = function () {
  return this.id;
};
Tile.prototype.setChildren = function (child) {
	this.children.push(child);
};
Tile.prototype.hasChildren = function () {
  return this.children.length;
};
Tile.prototype.getChildren = function () {
  return this.children;
};
Tile.prototype.thisOrSolid = function (level,x,y,z) {
  t = level.getTile(x,y,z);
  if(t.isSolid)return true;
  if(t==this)return true;
  return false;
};
Tile.prototype.bump = function (level,entity,x,y,z) {

};
var tile = [];
var AIR = new Tile(0,stoneImg,"NOPE");
var VOID = new Tile(1,stoneImg,"NOPE").setSolid(true);

var grass = new Tile(2,grassImg,"spade");
var stoneFloor = new Tile(3,stoneImg,"pickaxe");
var sand = new Tile(4,sandImg,"spade");
var logs = new Tile(5,logsImg,"NOPE");
var dirt = new Tile(6,dirtImg,"NOPE");

var solidGrass = new Tile(7,grassImg,"spade");
var stone = new Tile(8,larvaImg,"pickaxe").setSolid(true);
var sand2Solid = new Tile(9,sandImg,"spade").setSolid(true);
var logsPlaceSolid = new Tile(10,logsPlaceSolid,"axe").setSolid(true);
var solidDirt = new Tile(11,dirtImg,"spade").setSolid(true);


var PlanksSolid = new Tile(12,logsImg,"axe").setSolid(true);

var carrots = new Tile(13,carrotsImg,"spade");
var water = new Tile(14,waterImg,"bucket");
var tree = new Tile(15,greenlightImg,"axe").setSolid(true);
var grass2 = new Tile(16,grass2Img,"spade");
var grass3 = new Tile(17,grass3Img,"spade");
var steps = new Tile(18,redlightImg,"NOPE");
var stump = new Tile(19,stumpImg,"spade");
grass.setChildren(grass2);
grass.setChildren(grass3);
grass.setChildren(carrots);
