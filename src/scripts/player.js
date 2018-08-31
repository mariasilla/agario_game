import { canvas, ctx, socket, currentPlayer } from '../index.js';
// import handleCollisionFood from './handleCollision.js';
import {handleOtherPlayersCollision} from './handleCollision.js';
import {handleCollisionFood} from './handleCollision.js';

export default function movePlayer(e) {
    const mousePos = setMousePosition(e);
    deleteCurrentPlayerPos();
    currentPlayer.x = mousePos.x;
    currentPlayer.y = mousePos.y;
    currentPlayer.draw();
    handleCollisionFood();
    handleOtherPlayersCollision();
    socket.emit('playerMovement', { x: currentPlayer.x, y: currentPlayer.y, r: currentPlayer.r, color: currentPlayer.color});
};


function setMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.top,
        y: e.clientY - rect.left
    }
};

//delete current player position
function deleteCurrentPlayerPos() {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(currentPlayer.x, currentPlayer.y, currentPlayer.r + 1, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.fill();
    ctx.restore();
};

