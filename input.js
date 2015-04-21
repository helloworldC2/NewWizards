var Input = (function() {
  var left = false,
  right = false,
  up = false,
  down = false,
  action = false
  mouseScroll = 0;
  document.onkeydown = function (evt) {
    var event = evt || window.event;
    if (event.keyCode == 65) {
      left = true;
    } else if (event.keyCode == 68) {
      right = true;
    } else if (event.keyCode == 87) {
      up = true;
    } else if (event.keyCode == 83) {
      down = true;
    }else if (event.keyCode == 32) {
      action = true;
    }

  };

  document.onkeyup = function (evt) {
    evt = evt || window.event;
    var event = evt || window.event;
    if (event.keyCode == 65) {
      left = false;
    } else if (event.keyCode == 68) {
      right = false;
    } else if (event.keyCode == 87) {
      up = false;
    } else if (event.keyCode == 83) {
      down = false;
    }else if (event.keyCode == 32) {
      action = false;
    }
  };
  var onMouseWheel = function(evt){
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    mouseScroll = delta;
  };
  document.addEventListener("mousewheel", onMouseWheel, false);
  return {
    upPressed: function() { return up; },
    downPressed: function() { return down; },
    leftPressed: function() { return left; },
    rightPressed: function() { return right; },
    actionPressed: function() { return action; },
    mouseScroll: function() { var m = mouseScroll; mouseScroll =0;return m; }
  };


})();
