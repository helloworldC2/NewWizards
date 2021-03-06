function Player(username,x,y,z){
  Entity.call(this,x,y,z);
  this.username = username;
  this.inventory = new Inventory(9);
  this.inventory.addItem(fist);
  this.inHand = this.inventory.selectedItem;
  this.bb = [0,32,0,32];
  this.actionCoolDown = 0;
  this.hunger = 0;
  this.isIll = false;
  this.thirst = 0;
  this.health = 100;
  this.selectedTile = null;
}

Player.prototype.render = function(xoff,yoff){
  context.beginPath();
  context.lineWidth="3";
  context.strokeStyle="red";
  if(this.selectedTile!=null)
  context.rect((this.selectedTile[0]<<5)-xoff,(this.selectedTile[1]<<5)-yoff,32,32);
  context.stroke();
  switch(this.movingDir){
    case 0:
      context.drawImage(pFront, this.x-xoff, this.y-yoff,32,32);
      break;
    case 1:
      context.drawImage(pBack, this.x-xoff, this.y-yoff,32,32);
      break;
    case 2:
      context.drawImage(pSide, this.x-xoff, this.y-yoff,32,32);
      break;
    case 3:
      context.drawImage(pSide, this.x-xoff, this.y-yoff,32,32);
      break;
  }
  if(this.inHand)
  this.inHand.render(this.x-xoff,this.y-yoff);
};

Player.prototype.tick = function () {
  if(this.getTileUnder()==AIR&&this.z>0)this.z--;
  if(this.getTileUnder()==steps&&this.z<3)this.z++;
  this.actionCoolDown--;
  this.ticks++;
  //add degrade food
  this.centreX = this.x+16;
  this.centreY = this.y+16;
  var xx = this.centreX>>5,
  yy = this.centreY>>5;
  var dx=0,dy=0;
  if(Input.upPressed())dy=-2;
  if(Input.downPressed())dy=2;
  if(Input.leftPressed())dx=-2;
  if(Input.rightPressed())dx=2;

  if(this.movingDir == 0)this.selectedTile=[xx,yy+1];//up
  if(this.movingDir == 1)this.selectedTile=[xx,yy-1];//down
  if(this.movingDir == 2)this.selectedTile=[xx-1,yy];//left
  if(this.movingDir == 3)this.selectedTile=[xx+1,yy];//right
  var ix = this.selectedTile[0];
  var iy = this.selectedTile[1];


  if(Input.actionPressed()&&this.actionCoolDown<0){
    this.inHand.use(ix,iy,this.z);
    this.actionCoolDown = 20;
  }
  // var tried = [];
  // if(this.ticks%60===0||[this.x>>5,this.y>>5]===[31,31]){
  //   while(true){
  //     var currentCost = getDistance([this.x>>5,this.y>>5],[31,31]);
  //     dx = Math.floor(Math.random()*3)-1;
  //     dy = Math.floor(Math.random()*3)-1;
  //     if(tried.contains([dx,dy]))continue;
  //     var t = getTile(this.x>>5+dx,this.y>>5+dy);
  //     if(t === null || t === EMPTY||t.isSolid)continue;
  //     var tp = [(this.x>>5)+dx,(this.y>>5)+dy];
  //     var cost = getDistance(tp,[31,31]);
  //     if(cost<currentCost||tried.length>=9)break;
  //     console.log("Not: "+tp);
  //     tried.push(tp);
  //
  //   }
  // }
  // if(this.path==null){
  //   this.path = findPath([this.x>>5,this.y>>5],[10,1]);
  // }else{
  //   if(this.ticks%20===0){
  //     this.path = findPath([this.x>>5,this.y>>5],[10,1]);
  //   }
  //   if(this.path!=null&&this.path!=undefined){
  //     if(this.path.pos[0]>this.x>>5)dx=1;
  //     if(this.path.pos[0]<this.x>>5)dx=-1;
  //     if(this.path.pos[1]>this.y>>5)dy=1;
  //     if(this.path.pos[1]<this.y>>5)dy=-1;
  //   }else{
  //     console.log("No path :(");
  //   }
  // }

  var collided = this.move(dx,dy);
  if(!collided&&isMultiplayer)movePlayer(this);
  for(var i=0;i<level.entities.length;i++){
    if(level.entities[i].z!=this.z)continue;
    if(bbIntersect(this.bb,this.x,this.y,level.entities[i].bb,level.entities[i].x,level.entities[i].y))level.entities[i].interact();
  }

};
Player.prototype.move = Entity.prototype.move;
Player.prototype.getTileUnder = Entity.prototype.getTileUnder;
