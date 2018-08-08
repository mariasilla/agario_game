var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");


var x;
var y;
var player;
var radius;
var count;
var circlesNum;
var r;
var g;
var b;
var mouseX = 0;
var mouseY = 0;
var xPosition;
var yPosition;
var canvasPos;
var mass;
var foodCircles = [];


//function initiate the game
function gameInit (){
      drawPlayer();
      // movePlayersCircle();
      drawFood();  
}


button.addEventListener("click", gameInit, false);




