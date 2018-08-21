import './style.css';
import io from 'socket.io-client';
import makeFood from './scripts/food.js';
import movePlayer from './scripts/player.js';
import { log } from 'util';

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
export let playersClient = {};
export let currentPlayer;
export let otherPlayer;

//Socket.IO starts here
// (function () {
function gameCreate() {
      //socket.on listens to the currentPlayers event, and when this event is triggered
      //the function will be called with the players object passed from the server 
      //send the players object(all players info) to the new player
      socket.on('currentPlayers', function (players) {
            playersClient = players;
            Object.keys(players).forEach(function (id) {
                  // check to see if that player’s id matches the current player’s socket id
                  if (players[id].playerId === socket.id) {
                        //Add new Current Player to Canvas and pass the current player’s information
                        currentPlayer = new Ball(players[id].x, players[id].y, players[id].r, "rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')");
                        currentPlayer.draw();
                  } else {
                        //Add Other Players to Current Player's Canvas
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r, "rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')");
                        otherPlayer.draw();
                  };
            });
            //send new player's info to all other current players 
            socket.on('newPlayer', function (playerInfo) {
                  otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, "rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')");
                  otherPlayer.playerId = playerInfo.playerId;
                  otherPlayer.draw();
            });

            //NEED to CHANGE 
            // when a player moves, update the player data
            socket.on('playerMoved', function (playerInfo) {

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
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r, "rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')");
                        otherPlayer.draw();
                  });

                  // for (let i = 0; i < allPlayersArray.length; i++) {
                  //       if (playerInfo.playerId === allPlayersArray[i].playerId) {
                  //             allPlayersArray[i].x = playerInfo.x;
                  //             allPlayersArray[i].y = playerInfo.y;
                  //             allPlayersArray[i].r = playerInfo.r;
                  //       }
                  //       // otherPlayer = new Ball(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r, "rgba(255,0,0,1)");
                  //       // otherPlayer.draw();
                  // }

            });

            //NEED to CHANGE 
            socket.on('disconnect', function (playerId) {
                  //OPTION 1****************************************************************************** */
                  Object.keys(players).forEach(function (id) {
                        // if (playerId === players[id].playerId) {
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
                        ctx.clip();
                        ctx.fill();
                        ctx.restore();
                        // }
                  });
                  // socket.disconnect();

                  // //OPTION 2****************************************************************************** */
                  // for (let i = allPlayersArray.length - 1; i >= 0; i--) {
                  //       if (playerId === allPlayersArray[i].playerId) {
                  //             ctx.save();
                  //             ctx.globalCompositeOperation = 'destination-out';
                  //             ctx.beginPath();
                  //             ctx.arc(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
                  //             ctx.clip();
                  //             ctx.fill();
                  //             ctx.restore();
                  //             // if (i > -1) {
                  //             //       allPlayersArray.splice(i, 1);
                  //             // }
                  //       }
                  //       // console.log(allPlayersArray);
                  // }

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

            }); //socket.on disconnect ends here

            // socket.on('disconnectOtherPlayer', function () {
            //       //OPTION 1****************************************************************************** */
            //       Object.keys(players).forEach(function (id) {
            //             // if (playerId === players[id].playerId) {
            //             ctx.save();
            //             ctx.globalCompositeOperation = 'destination-out';
            //             ctx.beginPath();
            //             ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
            //             ctx.clip();
            //             ctx.fill();
            //             ctx.restore();
            //             // }
            //       });

            // }); //socket.on disconnect ends here

      }); //socket.on currentPlayers ends here



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
};//Socket.IO ends here

// }).call(this);



// export let playerCoords = new Ball(canvasWidth / 2, canvasHeight / 2, 16, "rgba(255,0,0,1)");


// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);

//function to initiate the game
function gameInit() {
      gameCreate();
      makeFood();
}

//if mouse is over middle of canvas, start the game 
gameInit();








