function Stack(item){
  this.item = item;
  this.stackSize = 1;
  this.maxSize = item.stackSize;
}
function Inventory(MAX_SIZE){
  this.MAX_SIZE = MAX_SIZE;
  this.stacks = [];
}

Inventory.prototype.render = function(){
  for(var i=0;i<this.stacks.length;i++){
    context.drawImage(this.stacks[i].item.image, i*20, 400,16,16);
    context.fillText(""+this.stacks[i].stackSize, i*20, 400);
  }
};
Inventory.prototype.addItem = function(item){
  for(var i=0;i<this.stacks.length;i++){
    if(this.stacks[i].item==item&&this.stacks[i].stackSize<this.stacks[i].maxSize){
      this.stacks[i].stackSize++;
      return;
    }
  }
  this.stacks.push(new Stack(item));
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
