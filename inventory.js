function Stack(item){
  this.item = item;
  this.stackSize = 1;
  this.x = 0;
  this.y = 0;
  this.maxSize = item.stackSize;
}
function Inventory(MAX_SIZE){
  this.MAX_SIZE = MAX_SIZE;
  this.stacks = [];
  this.currentItem = null;
  this.selected = 0;
}

Inventory.prototype.render = function(){
  for(var i=0;i<this.stacks.length;i++){
    var stack = this.stacks[i];
    context.drawImage(stack.item.image, stack.x+(64+i*64), stack.y+440,48,48);
    context.font = "32px Arial";
    context.fillText(""+this.stacks[i].stackSize, stack.x+(64+i*64), stack.y+430);
    if(i==this.selected){
      context.beginPath();
      context.lineWidth="3";
      context.strokeStyle="pink";
      context.rect(stack.x+(64+i*64),stack.y+440,48,48);
      context.stroke();
    }

  }
};
Inventory.prototype.tick = function(){
  if(Input.throwPressed()&&this.currentItem!=fist){
    var dirt = new EntityItem(this.currentItem,player.x+(player.movingDir==3?70:(player.movingDir==2?-32:0)),player.y+(player.movingDir==0?48:(player.movingDir==1?-64:0)),player.z,player.movingDir==3?1:player.movingDir==2?-1:(Math.random()*2)-1);
    this.removeItem(this.currentItem);
  }
  this.selected+=Input.mouseScroll();
  if(this.selected>=this.stacks.length)this.selected = 0;
  if(this.selected<0)this.selected = this.stacks.length-1;
  this.currentItem = this.stacks[this.selected].item;
  player.inHand = this.currentItem;
  if(hud.menuOut){
    for(var i=0;i<this.stacks.length;i++){
      var yoff = 256-Math.floor(i/3)*64;
      var xoff = 256-Math.floor(i/3)*64-(Math.floor(i/3)>0 ? (i%3*128+((Math.floor(i/3)>1?2:0)*(32*Math.floor(i/3)))): 0);
      var stack = this.stacks[i];
      stack.x= Easing.easeOutExpo(hud.ticks,0,xoff,50);
      stack.y= -Easing.easeOutExpo(hud.ticks,0,yoff,50);
    }
  }
  if(!hud.menuOut&&hud.ticks<=50&&hud.opened){
    for(var i=0;i<this.stacks.length;i++){
      var yoff = 256-Math.floor(i/3)*64;
      var xoff = 256-Math.floor(i/3)*64-(Math.floor(i/3)>0 ? (i%3*128+((Math.floor(i/3)>1?2:0)*(32*Math.floor(i/3)))): 0);
      var stack = this.stacks[i];
      stack.x= xoff-Easing.easeOutExpo(hud.ticks,0,xoff,50);
      stack.y= Easing.easeOutExpo(hud.ticks,0,yoff,50)-yoff;
      }
    }
};
Inventory.prototype.addItem = function(item){
  for(var i=0;i<this.stacks.length;i++){
    if(this.stacks[i].item==item&&this.stacks[i].stackSize<this.stacks[i].maxSize){
      this.stacks[i].stackSize++;
      return true;
    }
  }
  if(this.stacks.length<this.MAX_SIZE){
    this.stacks.push(new Stack(item));
    return true;
  }
  return false;//no room at the inn


};
Inventory.prototype.removeItem = function(item){
  for(var i=0;i<this.stacks.length;i++){
    if(this.stacks[i].item==item){
      this.stacks[i].stackSize--;
      if(this.stacks[i].stackSize<1)this.stacks.splice(i, 1);
      return;
    }
  }

};
Inventory.prototype.contains = function(item,amount){
  var numFound = 0;
  for(var i=0;i<this.stacks.length;i++){
    var stack = this.stacks[i];
    if(stack.item == item)numFound+=stack.stackSize;
  }
  if(numFound>=amount)return true;
  return false;
};
