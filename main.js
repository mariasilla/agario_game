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
var foodItemCoords;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// let playerCoords = {
//       x: canvasWidth / 2,
//       y: canvasHeight / 2,
//       r: 16
//       // defaultMass: 50
// };


let foodCoords = {
      x: x,
      y: y,
      r: 9
}

//function to initiate the game
function gameInit() {
      // new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      playerCoords.draw();
      // drawFood();
      makeFood();
}


// collision detection function 
// create a function that will loop through all the food items and compare every single food items coordinates with playerCoords

let dx;
let dy;
let distance;


// function handleCollision() {
//       dx = playerCoords.x - foodItemCoords.x;
//       dy = playerCoords.y - foodItemCoords.y;
//       distance = Math.sqrt(dx * dx + dy * dy);
//       mass = playerCoords.r/2;
//       console.log("playerX:" + playerCoords.x, "playerY:" + playerCoords.y, "foodX:" + foodItemCoords.x, "foodY:" + foodItemCoords.y, "playerR:" + playerItemCoords.r, "foodR:" + foodItemCoords.r);
     
//       if (distance < playerCoords.r + foodItemCoords.r) {

//             console.log("Collision detected!");
//             //  playerCoords.r = mass + playerCoords.r;
//             // collision detected 
//             // add mass to Player   new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
//             // remove foodItem 
//       }

// }


function updatePlayer () {

}

function updateFood () {

}


var playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 16, "rgba(255,0,0,1)");

function Ball(x, y, r, color) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
    }
  
  
    Ball.prototype.draw = function() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    


//     var testBall = new Ball(50, 100, 40, 'blue');
//     testBall.draw()


gameInit();




