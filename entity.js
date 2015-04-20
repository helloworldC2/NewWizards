function Entity(x,y,z){
  //A.call(this, a);
  this.level = level;
  this.x = x;
  this.y = y;
  this.z = z;
  this.centreX = x;
  this.centreY = y;
  this.ticks = 0;
  this.movingDir = 0;
  this.isSwimming = false;
  this.limitedToOneTile = false;
  this.entityCollidedWith = null;
  this.blocksPath = true;
  this.isSolid = true;
  this.speed = 1;
  this.bb = [0,32,0,32];
}

Entity.prototype.tick = function(){
  if(this.getTileUnder()==AIR)this.z--;
  if(this.getTileUnder()==steps)this.z++;

  this.ticks++;
};

Entity.prototype.move = function(dx,dy){
  if(dx==0&&dy==0)return true;
  if(dx!=0&&dy!=0){
    this.move(dx,0);
    this.move(0,dy);
    return;
  }
  var nx = this.x+dx;
  var ny = this.y+dy;

  var xMax = 31,
  xMin = 0,
  yMax = 31,
  yMin = 0;

  if(!level.getTile(this.x>>5,this.y>>5,this.z).isSolid){
    if(level.getTile(nx+xMin>>5,ny+yMin>>5,this.z).isSolid)return true;
    if(level.getTile(nx+xMax>>5,ny+yMin>>5,this.z).isSolid)return true;
    if(level.getTile(nx+xMax>>5,ny+yMax>>5,this.z).isSolid)return true;
    if(level.getTile(nx+xMin>>5,ny+yMax>>5,this.z).isSolid)return true;
  }
  if(dy < 0)this.movingDir = 1
  if(dy > 0)this.movingDir = 0
  if(dx < 0)this.movingDir = 2
  if(dx > 0)this.movingDir = 3

  if(this.ticks%this.getTileUnder().mCost ==0){
    this.x=nx;
    this.y=ny;
  }

};

Entity.prototype.getTileUnder = function(){
  return level.getTile((this.x+16)>>5,(this.y+16)>>5,this.z);
};
