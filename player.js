// draw the circle of current player 
function player (){
    x = canvas.width/2;
    y = canvas.height/2;
    radius = 14;
    drawPlayerCircle();
}

//create Player circle 
function drawPlayerCircle (){
    ctx.beginPath();
    ctx.arc(x,y,radius,Math.PI*2,0,false);
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fill();
    ctx.closePath();
}
