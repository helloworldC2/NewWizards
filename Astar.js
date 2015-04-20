function Node(pos, parent, costSoFar, distanceToEnd){
  this.pos = pos;
  this.parent = parent;
  this.costSoFar = costSoFar;
  this.distanceToEnd = distanceToEnd;
  this.totalCost = distanceToEnd + costSoFar;
}

function getDistance(a,b){
  var dx = a[0] - b[0];
  var dy = a[1] - b[1];
  return Math.sqrt(dx*dx+dy*dy);
}

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

// function sortByTotalCost(array){
//   var checked = 0;
//   while (true) {
//     checked = 0;
//     for(var i=0;i<array.length-1;i++){
//       if(array[i].totalCost>array[i+1].totalCost){
//         var temp = array[i];
//         array[i] = array[i+1];
//         array[i+1] = temp;
//         continue;
//       }
//       checked++;
//       console.log(checked);
//       //if(checked>=array.length-2)
//       return;
//     }
//   }
//   return false;
// }

function printList(list){

  for(var i=0;i<list.length;i++){
      console.log(list[i].totalCost);
  }


}


function findPath(start,goal){

  var openList = [];
  var closedList = [];
  var currentNode = new Node(start,null,0,getDistance(start,goal));
  openList.push(currentNode);
  while (openList.length >0){

    openList.sort(function(a,b){return parseFloat(a.totalCost)-parseFloat(b.totalCost)});
    currentNode = openList[0];
    if(currentNode.pos[0]==goal[0]&&currentNode.pos[1]==goal[1]){
      var path = [];
      while(currentNode.parent != null){
          path.push(currentNode);
          currentNode = currentNode.parent;
        }
        return path[path.length-1];
    }
    openList.splice(openList.indexOf(currentNode),1);
    closedList.push(currentNode);
    var x = currentNode.pos[0];
    var y  = currentNode.pos[1];
    for(var i =0;i<9;i++){
      //if(i===0)continue;
      //if(i===2)continue;
      if(i===4)continue;
      //if(i===6)continue;
      //if(i===8)continue;
      var dx = (i % 3) -1;
      var dy = Math.floor((i / 3) -1);
      var tile = getTile(x+dx,y+dy);
      if(tile === null || tile === EMPTY||tile.isSolid)continue;
      if(tile.isSolid)continue;
      var tilePos = [x+dx,y+dy];
      var costSoFar = currentNode.costSoFar + getDistance(currentNode.pos,tilePos);
      //costSoFar*=tile.getSpeed();
      var distanceToEnd = getDistance(tilePos,goal);
      var node = new Node(tilePos,currentNode,costSoFar,distanceToEnd);
      if(closedList.contains(tilePos) && costSoFar >= node.costSoFar){
        continue;
      }
      if(!openList.contains(tilePos) || costSoFar < node.costSoFar){
        openList.push(node);
      }
    }
}



return null;
}
