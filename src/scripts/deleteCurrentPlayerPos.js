import { canvas, ctx, socket, currentPlayer } from '../index.js';

export default function deleteCurrentPlayerPos( x, y, r) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, r + 1, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }