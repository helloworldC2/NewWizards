function GuiHUD(){
  this.menuOut = false;
  this.opened = false;
  this.menuX = 0;
  this.ticks = 0;
  this.selected = 0;
  this.doable = [];
  this.dontable = [];
}
GuiHUD.prototype.render = function(){
  player.inventory.render();

  context.fillStyle = "#FF0000";
  context.fillRect(this.menuX-256,0,256,canvas.height);



  for(var i=0;i<this.doable.length;i++){
    var recipe = this.doable[i];
    if(i==this.selected){
      context.beginPath();
      context.lineWidth="3";
      context.strokeStyle="pink";
      context.rect(this.menuX-240,48+i*72,230,64);
      context.stroke();
    }
    context.drawImage(recipe.item.image,this.menuX-240 , 64+i*72,48,48);
    for(var j=0;j<recipe.ingredients.length;j+=2){
      context.font = "24px Arial";
      context.fillStyle = "#000000";
      context.fillText(""+recipe.item.name, (this.menuX-240)+10+(j+1)*48, 60+i*72);
      context.drawImage(recipe.ingredients[j].image,(this.menuX-240)+10+(j+1)*48 , 64+i*72,32,32);
      context.font = "18px Arial";
      context.fillText(""+recipe.ingredients[j+1], (this.menuX-240)+10+(j+1)*48, 96+i*72);
    }

  }
  for(var i=this.doable.length;i<recipes.length;i++){
    var recipe = this.dontable[i-this.doable.length];
    if(i==this.selected){
      context.beginPath();
      context.lineWidth="3";
      context.strokeStyle="pink";
      context.rect(this.menuX-240,48+i*72,230,64);
      context.stroke();
    }
    context.drawImage(recipe.item.image,this.menuX-240 , 64+i*72,48,48);
    for(var j=0;j<recipe.ingredients.length;j+=2){
      context.font = "24px Arial";
      context.fillStyle = "#000000";
      context.fillText(""+recipe.item.name, (this.menuX-240)+10+(j+1)*48, 60+i*72);
      context.drawImage(recipe.ingredients[j].image,(this.menuX-240)+10+(j+1)*48 , 64+i*72,32,32);
      context.font = "18px Arial";
      context.fillText(""+recipe.ingredients[j+1], (this.menuX-240)+10+(j+1)*48, 96+i*72);
    }

  }

};

GuiHUD.prototype.tick = function(){
  this.ticks++;
  player.inventory.tick();
  this.doable = [];
  this.dontable = [];
  for(var i=0;i<recipes.length;i++){
    if(recipes[i].canMake()){
      this.doable.push(recipes[i]);
    }else{
      this.dontable.push(recipes[i]);
    }
  }
  if(this.menuOut){
    if(Input.upPressed())this.selected++;
    if(Input.downPressed())this.selected--;
    if(this.selected<0)this.selected = recipes.length-1;
    if(this.selected<recipes.length-1)this.selected = 0;
    if(Input.actionPressed()){
      if(this.selected<this.doable.length)this.doable[this.selected].make();
    }
  }
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

  for(var i=0;i<this.ingredients.length;i+=2){
    if(!player.inventory.contains(this.ingredients[i],this.ingredients[i+1]))return false;
  }
  return true;
};
Recipe.prototype.make = function(){
  for(var i=0;i<this.ingredients.length;i+=2){
    for(var j=0;j<this.ingredients[i+1];j++)player.inventory.removeItem(this.ingredients[i]);
  }
  if(!player.inventory.addItem(this.item))var dirt = new EntityItem(this.item,player.x+(player.movingDir==3?70:(player.movingDir==2?-32:0)),player.y+(player.movingDir==0?48:(player.movingDir==1?-64:0)),player.z,player.movingDir==3?1:player.movingDir==2?-1:(Math.random()*2)-1);
};

var recipes = [];
var woodenAxeR = new Recipe(woodenAxe,[itemDirt,2]);
var woodenSpadeR = new Recipe(woodenSpade,[itemDirt,1]);
