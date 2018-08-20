import './style.css';
import io from 'socket.io-client';
import makeFood from './scripts/food.js';
import movePlayer from './scripts/player.js';
import { log } from 'util';

//Socket.IO starts here
export let socket = io();

export let allPlayersArray = [];
// export let otherPlayersArray = [];
export let currentPlayer;
export let otherPlayer;

// (function () {
function gameCreate() {
      //socket.on listens to the currentPlayers event, and when this event is triggered
      //the function will be called with the players object passed from the server 
      //send the players object(all players info) to the new player
      socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                  allPlayersArray.push(players[id]);
                  // check to see if that player’s id matches the current player’s socket id
                  if (players[id].playerId === socket.id) {
                        //Add new Current Player to Canvas and pass the current player’s information
                        currentPlayer = new Ball(players[id].x, players[id].y, players[id].r, "rgba(255,0,0,1)");
                        currentPlayer.draw();
                  } else {
                        //Add Other Players to Current Player's Canvas
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r, "rgba(255,0,0,1)");
                        otherPlayer.draw();
                  };
            });
      });
      //send new player's info to all other current players 
      socket.on('newPlayer', function (playerInfo) {
            otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, "rgba(255,0,0,1)");
            otherPlayer.playerId = playerInfo.playerId;
            otherPlayer.draw();
      });

      //NEED to CHANGE 
      // when a player moves, update the player data
      socket.on('playerMoved', function (playerInfo) {
            
            for (let i = 0; i < allPlayersArray.length; i++) {
                  if (playerInfo.playerId === allPlayersArray[i].playerId) {
                        allPlayersArray[i].x = playerInfo.x;
                        allPlayersArray[i].y = playerInfo.y;
                        allPlayersArray[i].r = playerInfo.r;
                  }
            }

            // Object.keys(players).forEach(function (id) {
            //       if (playerInfo.playerId === players[id].playerId) {
            //             players[id].x = playerInfo.x;
            //             players[id].y = playerInfo.y;
            //             players[id].r = playerInfo.r;
            //       }
            // });
      });

      //NEED to CHANGE 
      socket.on('disconnect', function (playerId) {
            // debugger;
            // //OPTION 1****************************************************************************** */
            for (let i = allPlayersArray.length - 1; i >= 0; i--) {
                  if (playerId === allPlayersArray[i].playerId) {
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
                        ctx.clip();
                        ctx.fill();
                        ctx.restore();
                        // if (i > -1) {
                        //       allPlayersArray.splice(i, 1);
                        // }
                  }
                  console.log(allPlayersArray);
            }

            //OPTION 2****************************************************************************** */
            // Object.keys(players).reverse().forEach(function (id) {
            //       if (socket.id === players[id].playerId) {
            //             ctx.save();
            //             ctx.globalCompositeOperation = 'destination-out';
            //             ctx.beginPath();
            //             ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
            //             ctx.clip();
            //             ctx.fill();
            //             ctx.restore();
            //       }
            // });

            //OPTION 3****************************************************************************** */


            // for (let i = 0; i < otherPlayersArray.length; i++) {
            //       if (playerId === otherPlayersArray[i].playerId) {
            //             ctx.save();
            //             ctx.globalCompositeOperation = 'destination-out';
            //             ctx.beginPath();
            //             ctx.arc(otherPlayersArray[i].x, otherPlayersArray[i].y, otherPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
            //             ctx.clip();
            //             ctx.fill();
            //             ctx.restore();
            //       }
            // }

      });



      // socket.on('newPlayer', function (players) {
      //   let newPlayerCoords = new Ball(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r, "rgba(255,0,0,1)");
      //             newPlayerCoords.draw();
      // });

      // socket.on('draw', function (data) {
      //       let newPlayer = new Ball(data.x, data.y, data.r, "rgba(255,0,0,1)");
      //       function deleteCurrentPlayerPos() {
      //             ctx.save();
      //             ctx.globalCompositeOperation = 'destination-out';
      //             ctx.beginPath();
      //             ctx.arc(data.x, data.y, data.r + 1, 0, 2 * Math.PI, false);
      //             ctx.clip();
      //             ctx.fill();
      //             ctx.restore();
      //       }
      //       deleteCurrentPlayerPos();
      //       newPlayer.draw();
      // });
}

// }).call(this);


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

// export let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 16, "rgba(255,0,0,1)");

export default function Ball(x, y, r, color, velX, velY) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.playerId = socket.id;
}

Ball.prototype.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
}

// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);

//function to initiate the game
function gameInit() {
      gameCreate();
      // makeFood();
}

//if mouse is over middle of canvas, start the game 
gameInit();







// //ball animation update
// Ball.prototype.update = function () {
//       if ((this.x + this.r) >= canvasWidth) {
//             this.velX = -(this.velX);
//       }

//       if ((this.x - this.r) <= 0) {
//             this.velX = -(this.velX);
//       }

//       if ((this.y + this.r) >= canvasHeight) {
//             this.velY = -(this.velY);
//       }

//       if ((this.y - this.r) <= 0) {
//             this.velY = -(this.velY);
//       }

//       this.x += this.velX;
//       this.y += this.velY;

// }


// //Food collision detection
// Ball.prototype.collisionDetectFood = function () {
//       for (let j = 0; j < foodCirclesArr.length; j++) {
//             if (!(this === foodCirclesArr[j])) {
//                   let dx = this.x - foodCirclesArr[j].x;
//                   let dy = this.y - foodCirclesArr[j].y;
//                   let distance = Math.sqrt(dx * dx + dy * dy);

//                   if (distance < this.r + foodCirclesArr[j].r) {
//                         foodCirclesArr[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
//                   }
//             }
//       }
// }







