var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");
var x;
var y;
var radius;
var count;
var circlesNum;
var r;
var g;
var b;
var mouseX = 0;
var mouseY = 0;
var xPosition;
var yPosition;
var canvasPos;




//function initiate the game
function gameInit (){
      drawPlayer();
      drawFood();
}


canvasPos = getPosition(canvas);
//listening to the mouse event
canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
    mouseX = e.clientX -canvasPos.x;
    mouseY = e.clientY - canvasPos.y;
}

//getting the exact mouse position 
function getPosition(el) {
      xPosition = 0;
      yPosition = 0;

      while (el) {
          xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
          yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
          el = el.offsetParent;
      }
      return {
            x: xPosition,
            y: yPosition
      };

}





button.addEventListener("click", gameInit, false);




