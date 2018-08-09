var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");


var x;
var y;
var player;
// var radius;
var count;
var foodNum = 20;
var red;
var green;
var blue;
var mouseX = 0;
var mouseY = 0;
var xPosition;
var yPosition;
var canvasPos;
var mass;
var foodCirclesArr = [];
var newCircle;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let playerCoords = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      r: 16
      // defaultMass: 50
};


let foodCoords = {
      x: x,
      y: y,
      r: 9
}

//function to initiate the game
function gameInit() {
      new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      drawFood();
}



// add event listeners  
canvas.addEventListener("mousemove", movePlayer, false);

function movePlayer(e) {
      const mousePos = setMousePosition(e);
      deleteCurrentPlayerPos();
      playerCoords.x = mousePos.x;
      playerCoords.y = mousePos.y;
      new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      handleCollision();
}


function setMousePosition(e) {
      const rect = canvas.getBoundingClientRect();
      return {
            x: e.clientX - rect.top,
            y: e.clientY - rect.left
      }
}


//delete current player position
function deleteCurrentPlayerPos() {
      ctx.save();
      // ctx.arc(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r, 0, 2*Math.PI, false);
      ctx.rect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r + playerCoords.r, playerCoords.r + playerCoords.r);
      ctx.clip();
      // ctx.clearRect(0, 0, canvasWidth, canvasWidth);
      ctx.clearRect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r * 2, playerCoords.r * 2);
      ctx.restore();
}


// collision detection function 
// create a function that will loop through all the food items and compare every single food items coordinates with playerCoords

let dx;
let dy;
let distance;


function handleCollision() {
      dx = playerCoords.x - foodCoords.x;
      dy = playerCoords.y - foodCoords.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      console.log("playerX:" + playerCoords.x, "playerY:" + playerCoords.y, "foodX:" + foodCoords.x, "foodY:" + foodCoords.y, "playerR:" + playerCoords.r, "foodR:" + foodCoords.r);

      if (distance < playerCoords.r + foodCoords.r) {

            console.log("Collision detected!");

            // collision detected 
            // add mass to Player  
            // remove foodItem 
      }

}

gameInit();




