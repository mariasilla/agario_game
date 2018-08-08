// draw the circle of current player 
function drawPlayer (){
    // x = canvas.width/2;
    // y = canvas.height/2;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
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


