function EntityItem(item,x,y,z,dx){
  Entity.call(this,x,y,z);
  this.item = item;
  this.initY = y;
  this.dx = dx;
  this.bb = [0,16,0,16];
  level.entities.push(this);
}
EntityItem.prototype.render = function(xoff,yoff){
  context.drawImage(this.item.image, this.x-xoff, this.y-yoff,16,16);
};
EntityItem.prototype.tick = function(){
  //if(this.getTileUnder()==AIR&&this.z>0)this.z--;
  this.ticks++;
  if(this.ticks<30){
    this.y=Easing.easeOutBounce(this.ticks,this.initY,50,30);
    this.x+=this.dx;
    this.dx-=0.02;
  }else if(this.ticks%20<10){
    this.y+=0.1;
  }else{
    this.y-=0.1;
  }
  if(this.ticks>1000)level.entities.splice(level.entities.indexOf(this), 1);
};

EntityItem.prototype.getTileUnder = Entity.prototype.getTileUnder;
EntityItem.prototype.interact = function(){
  player.inventory.addItem(this.item);
  level.entities.splice(level.entities.indexOf(this), 1);
};
