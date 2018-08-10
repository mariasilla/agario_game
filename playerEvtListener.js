// add event listeners  
canvas.addEventListener("mousemove", movePlayer, false);

function movePlayer(e) {
      const mousePos = setMousePosition(e);
      deleteCurrentPlayerPos();
      playerCoords.x = mousePos.x;
      playerCoords.y = mousePos.y;
      //   new DrawPlayer(playerCoords.x, playerCoords.y, playerCoords.r);
      playerCoords.draw();
      handleCollision();
}


function setMousePosition(e) {
      const rect = canvas.getBoundingClientRect();
      return {
            x: e.clientX - rect.top,
            y: e.clientY - rect.left
      }
}

//delete current player position
function deleteCurrentPlayerPos() {

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(playerCoords.x, playerCoords.y, playerCoords.r + 1, 0, 2 * Math.PI, false);
      ctx.clip();
      ctx.fill();
      ctx.restore();

      // ctx.save();
      // // ctx.arc(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r, 0, 2*Math.PI, false);
      // ctx.rect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r + playerCoords.r, playerCoords.r + playerCoords.r);
      // ctx.clip();
      // // ctx.clearRect(0, 0, canvasWidth, canvasWidth);
      // ctx.clearRect(playerCoords.x - playerCoords.r, playerCoords.y - playerCoords.r, playerCoords.r * 2, playerCoords.r * 2);
      // ctx.restore();
}
