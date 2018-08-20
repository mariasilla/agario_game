import { canvas, ctx, socket, currentPlayer } from '../index.js';
// import handleCollisionFood from './handleCollision.js';
import handleOtherPlayersCollision from './handleCollision.js';

export default function movePlayer(e) {
    const mousePos = setMousePosition(e);
    deleteCurrentPlayerPos();
    // playerCoords.x = mousePos.x;
    // playerCoords.y = mousePos.y;
    currentPlayer.x = mousePos.x;
    currentPlayer.y = mousePos.y;
    // playerCoords.draw();
    currentPlayer.draw();
    // handleCollisionFood();
    handleOtherPlayersCollision();
    socket.emit('playerMovement', { x: currentPlayer.x, y: currentPlayer.y, r: currentPlayer.r});
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
    // ctx.arc(playerCoords.x, playerCoords.y, playerCoords.r + 1, 0, 2 * Math.PI, false);
    ctx.arc(currentPlayer.x, currentPlayer.y, currentPlayer.r + 1, 0, 2 * Math.PI, false);
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
