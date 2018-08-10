const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let button = document.getElementById("game_start");
let mouseX = 0;
let mouseY = 0;
let canvasPos;
let extraMass = 2;
let foodCirclesArr = [];
let score = 0;
let foodItemCoords;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let dx;
let dy;
let distance;

let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 12, "rgba(255,0,0,1)");

function Ball(x, y, r, color, velX, velY) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.velX = velX;
      this.velY = velY;
}

Ball.prototype.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
}

//ball animation update
Ball.prototype.update = function () {
      if ((this.x + this.r) >= canvasWidth) {
            this.velX = -(this.velX);
      }

      if ((this.x - this.r) <= 0) {
            this.velX = -(this.velX);
      }

      if ((this.y + this.r) >= canvasHeight) {
            this.velY = -(this.velY);
      }

      if ((this.y - this.r) <= 0) {
            this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
      
}


//Food collision detection
Ball.prototype.collisionDetectFood = function() {
      for (let j = 0; j < foodCirclesArr.length; j++) {
        if (!(this === foodCirclesArr[j])) {
          let dx = this.x - foodCirclesArr[j].x;
          let dy = this.y - foodCirclesArr[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.r + foodCirclesArr[j].r) {
            foodCirclesArr[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
          }
        }
      }
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




