import './style.scss';
import io from 'socket.io-client';
import movePlayer from './scripts/player.js';
import { log } from 'util';
import { random } from './scripts/random.js';



export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export let button = document.getElementById("game_start");
export let extraMass = 1.5;
export let foodCirclesArr = [];
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;
export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

export default function Ball(x, y, r, color) {
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
export let socket = io();
//players object on client side
// export let otherPlayersArray = [];
export let currentPlayer;
export let otherPlayer;
let foodItem;
// let overlapping = false;

//Socket.IO starts here
// (function () {
function gameCreate() {

      socket.on('food', function (foodCirclesArray) {

            for (let i = 0; i < foodCirclesArray.length; i++) {
                  foodItem = new Ball(foodCirclesArray[i].x, foodCirclesArray[i].y, foodCirclesArray[i].r,
                        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')');
                  foodItem.draw();
                  // let other = foodCirclesArray[i];
                  // let dx = foodItem.x - other.x;
                  // let dy = foodItem.y - other.y;
                  // let distance = Math.sqrt(dx * dx + dy * dy);
                  // if (distance < (foodItem.r) + other.r) {
                  //       overlapping = true;
                  // }
                  // if (!overlapping) {
                  foodCirclesArr.push(foodItem);
                  // }
            }

      });

      //socket.on listens to the currentPlayers event, and when this event is triggered
      //the function will be called with the players object passed from the server 
      //send the players object(all players info) to the new player
      // socket.on('playersArray', function (playersArray) {
      socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                  // for (let i = 0; i < playersArray.length; i++) {

                  if (players[id].playerId === socket.id) {
                        currentPlayer = new Ball(players[id].x, players[id].y, players[id].r);
                        currentPlayer.draw();
                  } else {
                        //Add Other Players to Current Player's Canvas
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r);
                        otherPlayer.draw();
                        // otherPlayersArray.push(otherPlayer);
                        // console.log(otherPlayersArray);
                  };
                  // }
            });
            //send new player's info to all other current players 
            socket.on('newPlayer', function (playerInfo) {
                  otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r);
                  otherPlayer.playerId = playerInfo.playerId;
                  otherPlayer.draw();
            });

            // when a player moves, update the player data
            socket.on('playerMoved', function (playerInfo) {
                  // for (let i = playersArray.length - 1; i >= 0; i--) {
                  Object.keys(players).forEach(function (id) {
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(otherPlayer.x, otherPlayer.y, otherPlayer.r + 1, 0, 2 * Math.PI, false);
                        ctx.clip();
                        ctx.fill();
                        ctx.restore();
                        players[id].x = playerInfo.x;
                        players[id].y = playerInfo.y;
                        players[id].r = playerInfo.r;
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r);
                        otherPlayer.draw();
                        // }
                  });
            });

            // //NEED to CHANGE 
            socket.on('userDisconnected', function (playerID) {

                  // console.log("User disconnected: " + playerID);
                  // for (let i = playersArray.length - 1; i >= 0; i--) {
                  //       console.log(playersArray[i].playerId);
                  //       if (playersArray[i].playerId === playerID) {
                  //             ctx.save();
                  //             ctx.globalCompositeOperation = 'destination-out';
                  //             ctx.beginPath();
                  //             ctx.arc(playersArray[i].x, playersArray[i].y, playersArray[i].r + 1, 0, 2 * Math.PI, false);
                  //             ctx.clip();
                  //             ctx.fill();
                  //             ctx.restore();
                  //             if (i > -1) {
                  //                   playersArray.splice(i, 1);
                  //             }
                  //       }
                  // };
                  Object.keys(players).forEach(function (id) {
                        // console.log(playerInfo);
                        console.log("current player: " + socket.id);
                        console.log(players[id]);
                        // if (players[id] === playerID) {
                              ctx.save();
                              ctx.globalCompositeOperation = 'destination-out';
                              ctx.beginPath();
                              ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
                              ctx.clip();
                              ctx.fill();
                              ctx.restore();
                              // console.log(players[playerInfo.playerId]);

                              // socket.close();
                              // global.disconnected = true;
                              // if (players[id] === playerInfo.playerId) {
                              // delete players[id];
                        // }
                        //NEED to find the way to delete this player from players object
                  });

            }); //socket.on disconnect ends here

      }); //socket.on currentPlayers ends here

      //********************************************************************************************/


      //             //NEED to CHANGE 
      //             socket.on('disconnect', function (playerId) {
      //                   //OPTION 1****************************************************************************** */
      //                   Object.keys(players).forEach(function (id) {
      //                         // if (playerId === players[id].playerId) {
      //                         ctx.save();
      //                         ctx.globalCompositeOperation = 'destination-out';
      //                         ctx.beginPath();
      //                         ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
      //                         ctx.clip();
      //                         ctx.fill();
      //                         ctx.restore();
      //                         // }
      //                   });
      //                   // socket.disconnect();

      //                   // //OPTION 2****************************************************************************** */
      //                   // for (let i = allPlayersArray.length - 1; i >= 0; i--) {
      //                   //       if (playerId === allPlayersArray[i].playerId) {
      //                   //             ctx.save();
      //                   //             ctx.globalCompositeOperation = 'destination-out';
      //                   //             ctx.beginPath();
      //                   //             ctx.arc(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
      //                   //             ctx.clip();
      //                   //             ctx.fill();
      //                   //             ctx.restore();
      //                   //             // if (i > -1) {
      //                   //             //       allPlayersArray.splice(i, 1);
      //                   //             // }
      //                   //       }
      //                   //       // console.log(allPlayersArray);
      //                   // }

      //                   //OPTION 3****************************************************************************** */


      //                   // for (let i = 0; i < otherPlayersArray.length; i++) {
      //                   //       if (playerId === otherPlayersArray[i].playerId) {
      //                   //             ctx.save();
      //                   //             ctx.globalCompositeOperation = 'destination-out';
      //                   //             ctx.beginPath();
      //                   //             ctx.arc(otherPlayersArray[i].x, otherPlayersArray[i].y, otherPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
      //                   //             ctx.clip();
      //                   //             ctx.fill();
      //                   //             ctx.restore();
      //                   //       }
      //                   // }

      //             }); //socket.on disconnect ends here

};//Socket.IO ends here

// }).call(this);



// export let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 16, "rgba(255,0,0,1)");


// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);


//function to initiate the game
function gameInit() {
      gameCreate();
      // makeFood();
}

//if mouse is over middle of canvas, start the game 
gameInit();


// io.socket.on('connection', socket => {
//       socket.on('food', onFoodCreation
// })


// io.socket.on('connection', socket => {
      // socket.on('food', foodCreation);
// })


