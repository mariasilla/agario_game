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

      socket.on('food', foodCirclesArray => {

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
      socket.on('currentPlayers', players => {
            Object.keys(players).forEach(function (id) {
                  // for (let i = 0; i < playersArray.length; i++) {

                  if (players[id].playerId === socket.id) {
                        currentPlayer = new Ball(players[id].x, players[id].y, players[id].r,players[id].color);
                        currentPlayer.draw();
                  } else {
                        //Add Other Players to Current Player's Canvas
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r,players[id].color);
                        otherPlayer.draw();
                        // otherPlayersArray.push(otherPlayer);
                        // console.log(otherPlayersArray);
                  };
            });

      }); //socket.on currentPlayers ends here


      //send new player's info to all other current players 
      socket.on('newPlayer', playerInfo => {
            otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, playerInfo.color);
            otherPlayer.playerId = playerInfo.playerId;
            otherPlayer.draw();
      });


      // when a player moves, update the player data
      //find a player in the players object 
      //with the id that matches the id of the player whose coordinates are broadcasted from the server
      socket.on('playerMoved', (players, otherPlayerInfo) => {

            Object.keys(players).forEach(function (id) {

                  // console.log("other player ID: " + otherPlayerInfo.playerId);
                  // console.log(currentPlayer.playerId);

                  if (otherPlayerInfo.playerId === players[id].playerId) {
                        function deleteCurrentPosition() {
                              ctx.save();
                              ctx.globalCompositeOperation = 'destination-out';
                              ctx.beginPath();
                              ctx.arc(otherPlayer.x, otherPlayer.y, otherPlayer.r + 1, 0, 2 * Math.PI, false);
                              ctx.clip();
                              ctx.fill();
                              ctx.restore();
                        };

                        deleteCurrentPosition();
                        players[id].x = otherPlayerInfo.x;
                        players[id].y = otherPlayerInfo.y;
                        players[id].r = otherPlayerInfo.r;
                        players[id].color = otherPlayerInfo.color;
                        otherPlayer = new Ball(players[id].x, players[id].y, players[id].r, players[id].color);
                        otherPlayer.draw();
                  };

                  // // if (players[id].playerId === socket.id) {
                  //       deleteCurrentPosition();

                  //       players[id].x = playerInfo.x;
                  //       players[id].y = playerInfo.y;
                  //       players[id].r = playerInfo.r;
                  //       otherPlayer = new Ball(players[id].x, players[id].y, players[id].r);
                  //       otherPlayer.draw();

                  // // }
                  // // else {
                  // //       deleteCurrentPosition();
                  // //       players[id].x = playerInfo.x;
                  // //       players[id].y = playerInfo.y;
                  // //       players[id].r = playerInfo.r;
                  // //       otherPlayer = new Ball(players[id].x, players[id].y, players[id].r);
                  // //       otherPlayer.draw();
                  // // }

                  // function deleteCurrentPosition() {
                  //       ctx.save();
                  //       ctx.globalCompositeOperation = 'destination-out';
                  //       ctx.beginPath();
                  //       ctx.arc(players[id].x, players[id].y, players[id].r + 1, 0, 2 * Math.PI, false);
                  //       ctx.clip();
                  //       ctx.fill();
                  //       ctx.restore();
                  // };
            });
      });

      // SOCKET DISCONNECT
      socket.on('userDisconnected', (players, disconnectedPlayer) => {
            // console.log(players);

            // Object.keys(players).forEach(function (id) {
                  // console.log("disconnected player id: "+ disconnectedPlayer.playerId);
                  // console.log("other players id: "+players[id].playerId);

                  // if (disconnectedPlayer.playerId === players[id].playerId) {
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(disconnectedPlayer.x, disconnectedPlayer.y, disconnectedPlayer.r + 1, 0, 2 * Math.PI, false);
                        ctx.clip();
                        ctx.fill();
                        ctx.restore();
                  // }
            // });

            //NEED to find the way to delete this player from players object
      }); //socket.on disconnect ends here

};//Socket.IO connection ends here

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


