import { canvas, socket, currentPlayer } from '../index.js';
import { handleOtherPlayersCollision } from './handleCollision.js';
import { handleCollisionFood } from './handleCollision.js';
import deletePosition from './deleteCurrentPlayerPos.js'

export default function movePlayer(e) {
    const mousePos = setMousePosition(e);
    deletePosition(currentPlayer.x, currentPlayer.y, currentPlayer.r);
    currentPlayer.x = mousePos.x;
    currentPlayer.y = mousePos.y;
    currentPlayer.draw();
    handleCollisionFood();
    handleOtherPlayersCollision();
    socket.emit('playerMovement', { x: currentPlayer.x, y: currentPlayer.y, r: currentPlayer.r, color: currentPlayer.color });
};

function setMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.top,
        y: e.clientY - rect.left
    }
};

