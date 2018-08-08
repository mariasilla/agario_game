var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");
var x;
var y;
var radius;
var count;
var circlesNum;
var r;
var g;
var b;


//function initiate the game
function gameInit (){
      drawMultipleCircles();
      player();
}

button.addEventListener("click", gameInit, false);




