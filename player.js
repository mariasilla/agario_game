//create player object 

// player = {
//     x: canvas.width/2,
//     y: canvas.height/2,
//     radius: 16,
//     color: "rgba(255,0,0,1)",
//     drawPlayer: function(){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // x = mouseX;
//         // y = mouseY;
//         ctx.beginPath();
//         ctx.arc(x, y, this.radius, Math.PI*2, 0, false);
//         ctx.fillStyle = "rgba(255,0,0,1)";
//         ctx.fill();
//         ctx.closePath();
//         requestAnimationFrame(player.drawPlayer);
//     }
// }


// draw the circle of current player 
function DrawPlayer(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, 0, false);
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fill();
    ctx.closePath();
}


// canvas.addEventListener("mouseover");
// canvas.addEventListener("mouseout");


// function movePlayersCircle () {
//     canvasPos = getPosition(canvas);

//     //listening to the mousemove event
//     canvas.addEventListener("mousemove", setMousePosition, false);

//     function setMousePosition(e) {
//         mouseX = e.clientX -canvasPos.x;
//         mouseY = e.clientY - canvasPos.y;
//     }

//     //getting the exact mouse position 
//     function getPosition(el) {
//           xPosition = 0;
//           yPosition = 0;

//           while (el) {
//               xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//               yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
//               el = el.offsetParent;
//           }
//           return {
//                 x: xPosition,
//                 y: yPosition
//           };

//     }
// }





