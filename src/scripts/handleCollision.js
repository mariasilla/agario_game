import { ctx, foodCirclesArr, extraMass, currentPlayer, socket, otherPlayer } from '../index.js';
import movePlayer from './player.js';

let dx;
let dy;
let distance;
let score = 0;

// player and other players collision detection function 
export function handleOtherPlayersCollision() {

    socket.on('sameSize', function (playerInfo, enemyInfo) {
        // compute the amount you need to move
        let step = enemyInfo.r + playerInfo.r - distance;
        // if there's a collision, normalize the vector
        dx /= distance; dy /= distance;
        // and then move the two centers apart
        enemyInfo.x -= dx * step / 2; enemyInfo.y -= dy * step / 2;
        playerInfo.x += dx * step / 2; playerInfo.y += dy * step / 2;
        //redraw enemy & player's circles
        currentPlayer.draw(playerInfo.x, playerInfo.y);
        otherPlayer.draw(enemyInfo.x, enemyInfo.y);
    });// socket sameSize ends here

    // socket.on('removeCurrentPlayer', function (playerInfo) {
    //     ctx.save();
    //     ctx.globalCompositeOperation = 'destination-out';
    //     ctx.beginPath();
    //     ctx.arc(playerInfo.x, playerInfo.y, playerInfo.r + 1, 0, 2 * Math.PI, false);
    //     ctx.clip();
    //     ctx.fill();
    //     ctx.restore();
    //     // stopMove();
    //     // console.log("stop movement");
    //     // alert("GAME OVER!");
    // });// socket removeCurrentPlayer ends here

    socket.on('removeEnemy', function (enemyInfo) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(enemyInfo.x, enemyInfo.y, enemyInfo.r + 1, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.fill();
        ctx.restore();
        console.log(enemyInfo.playerId);
        
        // stopMove();
        // socket.broadcast.emit('stop', stopMove());
    });// socket removeEnemy ends here

    // function stopMove() {
    //     alert("Game Over!")
    //     canvas.removeEventListener("mousemove", movePlayer, false);
    // }
}; // handleOtherPlayersCollision ends here



// player and food collision detection function 
export function handleCollisionFood() {
    // socket.on('food', function (foodCirclesArr) {
    // console.log(foodCirclesArr);
    //  }); //food socket ends here

    for (let i = foodCirclesArr.length - 1; i >= 0; i--) {

        dx = currentPlayer.x - foodCirclesArr[i].x;
        dy = currentPlayer.y - foodCirclesArr[i].y;

        distance = Math.sqrt(dx * dx + dy * dy);

        function removeFoodItem() {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(foodCirclesArr[i].x, foodCirclesArr[i].y, foodCirclesArr[i].r + 1, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.fill();
            ctx.restore();
        }

        if (distance < (currentPlayer.r + 1) + foodCirclesArr[i].r) {

            if (currentPlayer.r + 1 > foodCirclesArr[i].r) {
                removeFoodItem()
                growPlayerMass();
                //update player's score
                score += 5;
                console.log(score);
                document.getElementById('score').innerHTML = "Score: " + score;
                //remove foodItem from array 
                if (i > -1) {
                    foodCirclesArr.splice(i, 1);
                }
            }
        }

    }
} //handleCollisionFood ends here

//function to grow current player's mass 
function growPlayerMass() {
    currentPlayer.r += extraMass;
    currentPlayer.draw(currentPlayer.r);
    // console.log("extraMass:" + extraMass, "current Mass:" + currentPlayer.r);
    // socket.emit('playerMass', {r: currentPlayer.r});
}