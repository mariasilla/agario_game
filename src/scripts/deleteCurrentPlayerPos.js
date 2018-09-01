import { ctx } from '../index.js';

export default function deletePosition(x, y, r) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, r + 1, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.fill();
  ctx.restore();
};