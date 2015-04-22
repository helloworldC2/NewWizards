function Tile(id,image,tool) {
  this.image = image;
  this.isSolid = false;
  this.id = id;
  this.mCost = 1.0;
  this.children = [];
  this.tool = tool;
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
var water = new Tile(3,waterImg,"bucket");
var stone = new Tile(4,stoneImg,"pickaxe").setSolid(true);
var sand = new Tile(5,sandImg,"spade");
var tree = new Tile(6,greenlightImg,"axe").setSolid(true);;
var stoneFloor = new Tile(7,larvaImg,"pickaxe");
var steps = new Tile(8,redlightImg,"NOPE");
var grass2 = new Tile(9,grass2Img,"spade");
var grass3 = new Tile(10,grass3Img,"spade");
var stump = new Tile(11,stumpImg,"spade");
var drit = new Tile(12,dirtImg,"NOPE");
var logs = new Tile(13,logsImg,"NOPE");
var solidDirt = new Tile(14,dirtImg,"spade").setSolid(true);
var sand2Solid = new Tile(15,dirtImg,"spade").setSolid(true);
var logsPlaceSolid = new Tile(16,logsPlaceSolid,"axe").setSolid(true);
var PlanksSolid = new Tile(17,dirtImg,"axe").setSolid(true);
var carrots = new Tile(18,carrotsImg,"spade");
grass.setChildren(grass2);
grass.setChildren(grass3);
grass.setChildren(carrots);

