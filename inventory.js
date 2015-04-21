function Stack(item){
  this.item = item;
  this.stackSize = 1;
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
    context.drawImage(this.stacks[i].item.image, 64+i*64, 440,48,48);
    context.font = "32px Arial";
    context.fillText(""+this.stacks[i].stackSize, 64+i*64, 430);
    if(i==this.selected){
      context.beginPath();
      context.lineWidth="3";
      context.strokeStyle="pink";
      context.rect(64+i*64,440,48,48);
      context.stroke();
    }

  }
};
Inventory.prototype.tick = function(){
  this.selected+=Input.mouseScroll();
  if(this.selected>=this.stacks.length)this.selected = 0;
  if(this.selected<0)this.selected = this.stacks.length-1;
  this.currentItem = this.stacks[this.selected].item;
  player.inHand = this.currentItem;
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
