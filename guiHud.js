function GuiHUD(){
  this.menuOut = false;
  this.opened = false;
  this.menuX = 0;
  this.ticks = 0;
}
GuiHUD.prototype.render = function(){
  player.inventory.render();

  context.fillStyle = "#FF0000";
  context.fillRect(this.menuX-256,0,256,canvas.height);
  for(var i=0;i<recipes.length;i++){
    var recipe = recipes[i];
    context.drawImage(recipe.item.image,this.menuX-200 , 64+i*64,48,48);
    // for(var j=0;j<recipe.ingredients.length;i+=2){
    //   context.drawImage(recipe.ingredients[j].image,this.menuX-200+10+i*40 , 64+i*64,32,32);
    // }

  }

};

GuiHUD.prototype.tick = function(){
  this.ticks++;
  if(Input.craftingPressed()&&!this.menuOut&&this.menuX<5){
    this.menuOut = true;
    this.opened = true;
    Input.craftingUnPress();
    this.ticks = 0;
  }
  if(Input.craftingPressed()&&this.menuOut&&this.menuX>250){
    this.menuOut =false;
    Input.craftingUnPress();
    this.ticks = 0;
  }
  if(this.menuOut&&this.ticks<=50){
    this.menuX=Easing.easeOutExpo(this.ticks,0,256,50);
  }
  if(!this.menuOut&&this.ticks<=50&&this.opened){
    this.menuX=256-Easing.easeOutExpo(this.ticks,0,256,50);
  }
};

function Recipe(item,ingredients){
  this.ingredients = ingredients;
  this.item = item;
  recipes.push(this);
}

Recipe.prototype.canMake = function(){
  return false;
};
Recipe.prototype.make = function(){
  return this.item;
};

var recipes = [];
var woodenAxeR = new Recipe(woodenAxe,[itemDirt,2]);
