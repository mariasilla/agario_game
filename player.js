// draw the circle of current player 
function drawPlayer (){
    // x = canvas.width/2;
    // y = canvas.height/2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = mouseX;
    y = mouseY;
    radius = 16;

    ctx.beginPath();
    ctx.arc(x,y,radius,Math.PI*2,0,false);
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fill();
    ctx.closePath();
    requestAnimationFrame(drawPlayer);
}


// canvas.addEventListener("mouseover");
// canvas.addEventListener("mouseout");


function movePlayersCircle () {
    canvasPos = getPosition(canvas);
     
    //listening to the mousemove event
    canvas.addEventListener("mousemove", setMousePosition, false);
    
    function setMousePosition(e) {
        mouseX = e.clientX -canvasPos.x;
        mouseY = e.clientY - canvasPos.y;
    }
    
    //getting the exact mouse position 
    function getPosition(el) {
          xPosition = 0;
          yPosition = 0;
    
          while (el) {
              xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
              yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
              el = el.offsetParent;
          }
          return {
                x: xPosition,
                y: yPosition
          };
    
    }
     return true;
}





