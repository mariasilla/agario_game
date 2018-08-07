var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var button = document.getElementById("game_start");
var x;
var y;
var radius;

//function initiate the game
function gameInit (){
      drawMultipleCircles();
      player();
}

//draw multiple random same-size circles  
function drawMultipleCircles () {
     ctx.clearRect(0,0,600,600);
     for (var i=0; i<20; i++) {
         //randomize circles coordinates   
         x = Math.floor(Math.random()*500);
         y = Math.floor(Math.random()*500);
         radius = 9;

         //randomize circles color
         var r = Math.floor(Math.random()*255);
         var g = Math.floor(Math.random()*255);
         var b = Math.floor(Math.random()*255);

         ctx.beginPath();
         ctx.arc(x,y,radius,Math.PI*2,0,false);
         ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
         ctx.fill();
         ctx.closePath();

     }    
}

// draw the circle of current player 
function player (){
      // ctx.clearRect(0,0,600,600);
      x = canvas.width/2;
      y = canvas.height/2;
      radius = 14;

      ctx.beginPath();
      ctx.arc(x,y,radius,Math.PI*2,0,false);
      ctx.fillStyle = "rgba(255,0,0,1)";
      ctx.fill();
      ctx.closePath();

}

button.addEventListener("click", gameInit, false);




