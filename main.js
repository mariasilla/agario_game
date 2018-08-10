var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");


var x;
var y;
var player;
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

let dx;
let dy;
let distance;

let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 10, "rgba(255,0,0,1)");

function Ball(x, y, r, color) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
}


Ball.prototype.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
}

// let playerCoords = {
//       x: canvasWidth / 2,
//       y: canvasHeight / 2,
//       r: 16
//       // defaultMass: 50
// };


// let foodCoords = {
//       x: x,
//       y: y,
//       r: 9
// }

//function to initiate the game
function gameInit() {
      // new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      playerCoords.draw();
      makeFood();
}





function updatePlayer() {

}

function updateFood() {

}



gameInit();




