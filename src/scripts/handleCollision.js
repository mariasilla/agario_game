import { ctx, foodCirclesArr, extraMass, currentPlayer, otherPlayer, playersClient } from '../index.js';

let dx;
let dy;
let distance;
let score = 0;

// player and other players collision detection function 
export default function handleOtherPlayersCollision() {
    // for (let i = allPlayersArray.length - 1; i >= 0; i--) {

    //     dx = currentPlayer.x - allPlayersArray[i].x;
    //     dy = currentPlayer.y - allPlayersArray[i].y;

    //     distance = Math.sqrt(dx * dx + dy * dy);

    //     function removeOtherPlayer() {
    //         ctx.save();
    //         ctx.globalCompositeOperation = 'destination-out';
    //         ctx.beginPath();
    //         ctx.arc(allPlayersArray[i].x, allPlayersArray[i].y, allPlayersArray[i].r + 1, 0, 2 * Math.PI, false);
    //         ctx.clip();
    //         ctx.fill();
    //         ctx.restore();
    //     }

    //     if (distance < (currentPlayer.r + 1) + allPlayersArray[i].r) {

    //         if (currentPlayer.r + 1 > allPlayersArray[i].r) {
    //             removeOtherPlayer()
    //             growPlayerMass();
    //             //remove from array 
    //             if (i > -1) {
    //                 allPlayersArray.splice(i, 1);
    //             }
    //         }

    //         console.log("Collision detected!");
    //         // console.log("Food item X" + foodCirclesArr[i].x, "Food item Y" + foodCirclesArr[i].y);
    //         // console.log("foodItem Index:" + i);
    //     }

    // }
    /***************************************************************** */
    // socket.on('currentPlayers', function (players) {
    
    Object.keys(playersClient).forEach(function (id) {
        console.log(Object.keys(playersClient));
        // console.log("Other Player X: " + otherPlayer.x, "Other Player Y: " + otherPlayer.y);

        dx = currentPlayer.x - playersClient[id].x;
        dy = currentPlayer.y - playersClient[id].y;

        distance = Math.sqrt(dx * dx + dy * dy);

        function removeOtherPlayer() {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(playersClient[id].x, playersClient[id].y, playersClient[id].r + 1, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.fill();
            ctx.restore();
        }

        if (distance < (currentPlayer.r + 1) + playersClient[id].r) {

            if (currentPlayer.r + 1 > playersClient[id].r) {
                removeOtherPlayer()
                growPlayerMass();
            }
            console.log("Collision detected!");
        }
    })
}; 


// player and food collision detection function 
export function handleCollisionFood() {

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

            console.log("Collision detected!");
            // console.log("Food item X" + foodCirclesArr[i].x, "Food item Y" + foodCirclesArr[i].y);
            console.log("foodItem Index:" + i);
        }

    }
}

//function to grow current player's mass 
function growPlayerMass() {
    currentPlayer.r += extraMass;
    currentPlayer.draw(currentPlayer.r);
    console.log("extraMass:" + extraMass, "current Mass:" + currentPlayer.r);
    // socket.emit('playerMass', {r: currentPlayer.r});
}