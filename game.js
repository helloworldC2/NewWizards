//canvas setup
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var gl; // A global variable for the WebGL context



var box = canvas.getBoundingClientRect();
canvas.width = (1280/5)*4;
canvas.height = (720/5)*4;
context.imageSmoothingEnabled = false;
//END




var defeat = false;
var gameOver = false;
var scorePosted = false;
var isMultiplayer = false;
var isRunning = false;
var startTime = new Date().getTime();
var player = null;
var level = null;
var hud = new GuiHUD();

function quitGame(){
  //exit stuff here
  console.log("Quiting Game!");
}


//helpful functions
function bbIntersect(bb1,x1,y1,bb2,x2,y2){

  if(bb1[0]+x1 < bb2[1]+x2 && bb1[1]+x1 > bb2[0]+x2 &&bb2[2]+y1 < bb2[3]+y2 && bb2[3]+y1 > bb2[2]+y2)return true;
  return false;
}



function tick(){
  if(!isRunning)return;

  if(!isMultiplayer&&!gameOver&&!hud.menuOut){
    level.tick();
  }
  if(!gameOver&&player!=null&&!hud.menuOut){
    player.tick();
  }
  hud.tick();
}

function render(){
  if(!isRunning)return;
  context.fillStyle = 'black';
  context.clearRect(0, 0, canvas.width, canvas.height);
  var xoff = player.x - (canvas.width/2)
  var yoff = player.y - (canvas.height/2)
  if(xoff < 0){
    xoff = 0;
  }
  if(xoff > ((level.width << 5) - canvas.width)){
    xoff = ((level.width  << 5) - canvas.width);
  }
  if(yoff < 0){
    yoff = 0;
  }
  if(yoff > ((level.height  << 5) - canvas.height)){
    yoff = ((level.height << 5) - canvas.height);
  }
  level.render(xoff,yoff);
  for(var p=0;p<players.length;p++){
    if(player[p].z==player.z)players[p].render(xoff,yoff);
  }
  if(player!=null)player.render(xoff,yoff);
  context.fillText("FPS: "+fps, 10, 10);
  hud.render();

}

function start(){
  level = new Level(128,128);
  player = new Player("Dave",32,32,2);
  if(isMultiplayer){
    login(player);

    var tout  = setInterval(function(){
    context.fillStyle = 'black';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("Trying to Connect!", 122, 210);
    if(!isRunning&&new Date().getTime() - startTime>8000){
      console.log("Connection timeout");
      isMultiplayer = false;
      isRunning = true;
      level.generateLevel(Math.random());
      clearInterval(tout);
    }
    if(isRunning)clearInterval(tout);
    },100);

  }else{
    level.generateLevel(Math.random());
    isRunning = true;
  }


//  while(isMultiplayer&&!isHost&&level.tiles==[])console.log("waiting..");

}
function timestamp() {
  return window.performance && window.performance.now ? window.performance.now():new Date().getTime();
}

var now,
dt = 0,
last = timestamp(),
step = 1 / 60;
var frames = 0;
var ticks = 0;
var fps = 0;
function frame() {
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while (dt > step) {
    dt = dt - step;
    tick();
    ticks++;
    if (ticks % 60 == 0) {
      fps = frames;
      frames = 0;
    }
  }
  render();
  frames++;
  last = now;
  requestAnimationFrame(frame);
}
start();
requestAnimationFrame(frame);
