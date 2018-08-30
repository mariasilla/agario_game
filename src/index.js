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
export let playersArray = [];
export let currentPlayer;
export let otherPlayer;
let foodItem;

// let overlapping = false;

//Socket.IO starts here
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
            console.log("players object: ", players);

            playersArray = Object.values(players);

            // Object.keys(players).forEach(function (id) {
            //       playersArray.push(players[id]);
            // });
            for (let i = 0; i < playersArray.length; i++) {

                  if (playersArray[i].playerId === socket.id) {
                        currentPlayer = new Ball(playersArray[i].x, playersArray[i].y, playersArray[i].r, playersArray[i].color);
                        currentPlayer.draw();
                  } else {
                        //Add Other Players to Current Player's Canvas
                        otherPlayer = new Ball(playersArray[i].x, playersArray[i].y, playersArray[i].r, playersArray[i].color);
                        otherPlayer.draw();
                        // otherPlayersArray.push(otherPlayer);
                        // console.log(otherPlayersArray);
                  };
            }


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
      socket.on('playerMoved', (otherPlayerInfo) => {
            for (let i = playersArray.length - 1; i >= 0; i--) {
                  // if (otherPlayerInfo.playerId === playersArray[i].playerId) {
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
                  playersArray[i].x = otherPlayerInfo.x;
                  playersArray[i].y = otherPlayerInfo.y;
                  playersArray[i].r = otherPlayerInfo.r;
                  playersArray[i].color = otherPlayerInfo.color;

                  otherPlayer = new Ball(playersArray[i].x, playersArray[i].y, playersArray[i].r, playersArray[i].color);
                  otherPlayer.draw();
                  // };
            }; //for loop ends here
            // }); 
      });

      // SOCKET DISCONNECT
      socket.on('userDisconnected', (disconnectedPlayer) => {
            // console.log("before splice: ", playersArray);
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(disconnectedPlayer.x, disconnectedPlayer.y, disconnectedPlayer.r + 1, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.fill();
            ctx.restore();
            for (let i = playersArray.length - 1; i >= 0; i--) {
                  if (disconnectedPlayer.playerId === playersArray[i].playerId) {
                        if (i > -1) {
                              playersArray.splice(i, 1);
                        }
                  }
            }
            // console.log("after splice: ", playersArray);
      }); //socket.on disconnect ends here

};//Socket.IO connection ends here

// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);


//function to initiate the game
function gameInit() {
      gameCreate();
}

//if mouse is over middle of canvas, start the game 
gameInit();


// io.socket.on('connection', socket => {
//       socket.on('food', onFoodCreation
// })


// io.socket.on('connection', socket => {
      // socket.on('food', foodCreation);
// })




