import './style.scss';
import io from 'socket.io-client';
import movePlayer from './scripts/player.js';
import { log } from 'util';
import { random } from './scripts/random.js';
import deletePosition from './scripts/deleteCurrentPlayerPos.js'


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
let currentPlayerBroadcast;
let foodItem;



//Socket.IO starts here
function gameCreate() {

      //socket createFood
      socket.on('food', onCreateFood);

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
                  'rgb(' + random() + ',' + random() + ',' + random() + ')');
            foodItem.draw();
            foodCirclesArr.push(foodItem);
      }
}

function addPlayers(players) {
      playersArray = Object.values(players);

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

//broadcast new player to other players
function addNewPlayer(playerInfo) {
      currentPlayerBroadcast = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, playerInfo.color);
      currentPlayerBroadcast.draw();
      playersArray.push(playerInfo);
};

// when a player moves, update the player data
//find a player in the players array 
//with the id that matches the id of the player whose coordinates are broadcasted from the server
function onPlayerMove(playerInfo) {

      for (let i = playersArray.length - 1; i >= 0; i--) {

            getPlayerByID();
            otherPlayer = new Ball(playerInfo.x, playerInfo.y, playerInfo.r, playerInfo.color);
            otherPlayer.draw();

            function getPlayerByID() {
                  if (playerInfo.playerId === playersArray[i].playerId
                        && playerInfo.playerId !== socket.id) {

                        deletePosition(playersArray[i].x, playersArray[i].y, playersArray[i].r);
                        otherPlayer = playersArray[i];
                        otherPlayer.x = playerInfo.x;
                        otherPlayer.y = playerInfo.y;
                        otherPlayer.r = playerInfo.r;
                        otherPlayer.color = playerInfo.color;
                  };
            }

      }; //for loop ends here
};




function onDisconnect(disconnectedPlayer) {
      deletePosition(disconnectedPlayer.x, disconnectedPlayer.y, disconnectedPlayer.r);

      for (let i = playersArray.length - 1; i >= 0; i--) {
            if (disconnectedPlayer.playerId === playersArray[i].playerId) {

                  playersArray.splice(i, 1);

            }
      }
      console.log("user disconnected: ", disconnectedPlayer.playerId);

};
