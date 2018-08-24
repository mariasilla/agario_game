import { ctx, foodCirclesArr, extraMass, currentPlayer, socket, otherPlayersArray } from '../index.js';
import movePlayer from './player.js';

let dx;
let dy;
let distance;
let score = 0;

// player and other players collision detection function 
export function handleOtherPlayersCollision() {

    socket.on('removeEnemy', function (enemyInfo) {
        //update player's score
        debugger;
        // score += 5;
        // console.log(score);
        // document.getElementById('score').innerHTML = "Score: " + score;
        // socket.on('message', function (message) {
        //     console.log(message);
        // });
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(enemyInfo.x, enemyInfo.y, enemyInfo.r + 1, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.fill();
        ctx.restore();
        // growPlayerMass();
        // console.log(otherPlayersArray);        

    });// socket removeEnemy ends here

    socket.on('removeCurrentPlayer', function (playerInfo) {
        // socket.on('message', function (message) {
        //      console.log(message);

        // });
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(playerInfo.x, playerInfo.y, playerInfo.r + 1, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.fill();
        ctx.restore();
        stopMove();
        console.log("stop movement");
        
        // alert("GAME OVER!");
    });// socket removeCurrentPlayer ends here

    function stopMove() {
        canvas.removeEventListener("mousemove", movePlayer, false);
    }

    // socket.on('bothSameSize', function (enemyInfo, playerInfo) {
    // dx = -dx;
    // dy = -dy;
    // });// socket bothSameSize ends here


    // v₂ = v₁ - 2 (v₁ · n) n


}; // handleOtherPlayersCollision ends here



// player and food collision detection function 
export function handleCollisionFood() {
    // socket.on('food', function (foodCirclesArr) {
    // console.log(foodCirclesArr);

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

            // console.log("Collision detected!");
            // // console.log("Food item X" + foodCirclesArr[i].x, "Food item Y" + foodCirclesArr[i].y);
            // console.log("foodItem Index:" + i);
        }

    }
    // }); //food socket ends here
}

//function to grow current player's mass 
function growPlayerMass() {
    currentPlayer.r += extraMass;
    currentPlayer.draw(currentPlayer.r);
    // console.log("extraMass:" + extraMass, "current Mass:" + currentPlayer.r);
    // socket.emit('playerMass', {r: currentPlayer.r});
}