var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");


var x;
var y;
var player;
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
var mass;
var foodCircles = [];

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let playerCoords = {
      x: canvasWidth/2,
      y: canvasHeight/2,
      r: 16
};


//function initiate the game
function gameInit() {
      new drawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      // movePlayersCircle();
      drawFood();
}

canvas.addEventListener("click", movePlayer, false);

function movePlayer(e) {
      const mousePos = setMousePosition(e);

      deleteCurrentPlayerPos();

      playerCoords.x = mousePos.x;
      playerCoords.y = mousePos.y;
      drawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
}

function setMousePosition(e) {
      const rect = canvas.getBoundingClientRect();
      return {
            x : e.clientX - rect.top,
            y: e.clientY - rect.left
      }
}

function deleteCurrentPlayerPos() {
      ctx.save();
      // c.arc(x, y, radius, 0, 2*Math.PI, true);
      ctx.rect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r + playerCoords.r, playerCoords.r + playerCoords.r);
      ctx.clip();
      // ctx.clearRect(0, 0, canvasWidth, canvasWidth);
      ctx.clearRect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r*2, playerCoords.r*2);
      ctx.restore();
}

gameInit();



