import makeFood from './modules/food.js';
import movePlayer from './modules/player.js';

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export let button = document.getElementById("game_start");
export let extraMass = 2;
export let foodCirclesArr = [];

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

export let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 12, "rgba(255,0,0,1)");

export default function Ball(x, y, r, color, velX, velY) {
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
Ball.prototype.collisionDetectFood = function () {
      for (let j = 0; j < foodCirclesArr.length; j++) {
            if (!(this === foodCirclesArr[j])) {
                  let dx = this.x - foodCirclesArr[j].x;
                  let dy = this.y - foodCirclesArr[j].y;
                  let distance = Math.sqrt(dx * dx + dy * dy);

                  if (distance < this.r + foodCirclesArr[j].r) {
                        foodCirclesArr[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                  }
            }
      }
}



// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);


//function to initiate the game
function gameInit() {
      // new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      playerCoords.draw();
      makeFood();
}


gameInit();




