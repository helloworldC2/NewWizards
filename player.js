function Player(username,x,y,z){
  Entity.call(this,x,y,z);
  this.username = username;
  this.inHand = woodenSpade;
  this.inventory = new Inventory(10);
  this.bb = [0,32,0,32];
  this.actionCoolDown = 0;
  this.hunger = 0;
  this.isIll = false;
  this.thirst = 0;
  this.health = 100;
}

Player.prototype.render = function(xoff,yoff){
  this.inventory.render();
  context.fillStyle = "#FF0000";
  context.fillRect(this.x-xoff,this.y-yoff,32,32);
  if(this.inHand!=="undefined")
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
  var selectedTile = [];
  if(this.movingDir == 0)selectedTile=[xx,yy+1];//up
  if(this.movingDir == 1)selectedTile=[xx,yy-3];//down
  if(this.movingDir == 2)selectedTile=[xx-1,yy-1];//left
  if(this.movingDir == 3)selectedTile=[xx+1,yy-1];//right
  var ix = selectedTile[0];
  var iy = selectedTile[1];


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
