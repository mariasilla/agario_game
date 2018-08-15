// import './style.css';
// import io from 'socket.io';
import io from 'socket.io-client';
import makeFood from './scripts/food.js';
import movePlayer from './scripts/player.js';
// import deleteCurrentPlayerPos from './scripts/player.js';
// export const socket = io('http://localhost'); 

//Socket.IO starts here
// $(function () {
export let socket = io();

(function () {
      // document.getElementById('chat_form').submit(function () {
      //       socket.emit('chat message', document.getElementById('m').val);
      //       document.getElementById('id').val = "";
      //       return false;
      // });
      // socket.on('chat message', function (msg) {
      //       document.getElementById('messages').appendChild(document.createElement('li')).innerHTML = msg;
      // });


      // $('form').submit(function () {
      //       socket.emit('chat message', $('#m').val());
      //       $('#m').val("");
      //       return false;
      // });
      // socket.on('chat message', function (msg) {
      //       $('#messages').append($('<li>').text(msg));
      // });
      socket.on('connect', function () {
            socket.emit('coordinates', { x: playerCoords.x, y: playerCoords.y, r: playerCoords.r, id: socket.id });
      });

      socket.on('draw', function (data) {
            let newPlayerCoords = new Ball(data.x, data.y, data.r, "rgba(255,0,0,1)");
            function deleteCurrentPlayerPos() {
                  ctx.save();
                  ctx.globalCompositeOperation = 'destination-out';
                  ctx.beginPath();
                  ctx.arc(data.x, data.y, data.r + 1, 0, 2 * Math.PI, false);
                  ctx.clip();
                  ctx.fill();
                  ctx.restore();
            }
            deleteCurrentPlayerPos();
            newPlayerCoords.draw();
      });

}).call(this);

// });
//Socket.IO ends here

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export let button = document.getElementById("game_start");
export let extraMass = 1.5;
export let foodCirclesArr = [];
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;
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




