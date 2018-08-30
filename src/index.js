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
export let otherPlayersArray;
export let currentPlayer;
export let otherPlayer;
let foodItem;


//Socket.IO starts here
function gameCreate() {

      //socket createFood
      socket.on('food', onCreateFood);

      //the function will be called with the players object passed from the server 
      //send the players object(all players info) to the new player
      socket.on('currentPlayers', addPlayers);

      //send new player's info to all other current players 
      socket.on('newPlayer', addNewPlayer);

      socket.on('playerMoved', onPlayerMove);

      // SOCKET DISCONNECT
      socket.on('userDisconnected', onDisconnect); //socket.on disconnect ends here

};//Socket.IO ends here

// add player event listeners  
canvas.addEventListener("mousemove", movePlayer, false);

//function to initiate the game
function gameInit() {
      gameCreate();
}

//if mouse is over middle of canvas, start the game 
gameInit();

function onCreateFood(foodCirclesArray) {
      for (let i = 0; i < foodCirclesArray.length; i++) {
            foodItem = new Ball(foodCirclesArray[i].x, foodCirclesArray[i].y, foodCirclesArray[i].r,
                  'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')');
            foodItem.draw();
            foodCirclesArr.push(foodItem);
      }
}

function addPlayers(players) {
      // console.log("players object: ", players);

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
            };
      }
};

function addNewPlayer(playerInfo) {
    
      otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, playerInfo.color);
      otherPlayer.playerId = playerInfo.playerId;
      otherPlayer.draw();
};

// when a player moves, update the player data
//find a player in the players array 
//with the id that matches the id of the player whose coordinates are broadcasted from the server
function onPlayerMove(otherPlayerInfo) {

      for (let i = playersArray.length - 1; i >= 0; i--) {
            // if (otherPlayerInfo.playerId === playersArray[i].playerId) {
            deleteCurrentPosition();
            playersArray[i].x = otherPlayerInfo.x;
            playersArray[i].y = otherPlayerInfo.y;
            playersArray[i].r = otherPlayerInfo.r;
            playersArray[i].color = otherPlayerInfo.color;

            otherPlayer = new Ball(playersArray[i].x, playersArray[i].y, playersArray[i].r, playersArray[i].color);
            otherPlayer.draw();
            // };

            function deleteCurrentPosition() {
                  ctx.save();
                  ctx.globalCompositeOperation = 'destination-out';
                  ctx.beginPath();
                  ctx.arc(otherPlayer.x, otherPlayer.y, otherPlayer.r + 1, 0, 2 * Math.PI, false);
                  ctx.clip();
                  ctx.fill();
                  ctx.restore();
            };
      }; //for loop ends here
};

function onDisconnect(disconnectedPlayer) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(disconnectedPlayer.x, disconnectedPlayer.y, disconnectedPlayer.r + 1, 0, 2 * Math.PI, false);
      ctx.clip();
      ctx.fill();
      ctx.restore();
      // for (let i = playersArray.length - 1; i >= 0; i--) {
      //       if (disconnectedPlayer.playerId === playersArray[i].playerId) {
      //             if (i > -1) {
      //                   playersArray.splice(i, 1);
      //             }
      //       }
      // }
      console.log("user disconnected: ", disconnectedPlayer.playerId);
};
