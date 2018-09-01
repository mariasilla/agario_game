import { ctx, foodCirclesArr, extraMass, currentPlayer, otherPlayer, socket, playersArray } from '../index.js';
import movePlayer from './player.js';
import deletePosition from './deleteCurrentPlayerPos.js'
import { log } from 'util';

let dx;
let dy;
let distance;
let score = 0;
let modal;

// player and other players collision detection function 
export function handleOtherPlayersCollision() {

    //1.
    socket.on('sameSize', onSameSize);
    //2.
    socket.on('removeEnemy', onRemoveEnemy);
    //3.
    socket.on('removeCurrentPlayer', onRemoveCurrentPlayer);

}; // handleOtherPlayersCollision ends here

//1.
export function onSameSize(playerInfo, enemyInfo) {
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
};
//2.
export function onRemoveEnemy(enemyInfo) {

    deletePosition(enemyInfo.x,enemyInfo.y,enemyInfo.r);

    // for (let i = playersArray.length - 1; i >= 0; i--) {

    //     if (enemyInfo.playerId === playersArray[i].playerId) {
    //         if (i > -1) {
    //             playersArray.splice(i, 1);
    //         }
    //     }
    // }
};
//3.
export function onRemoveCurrentPlayer(playerInfo) {

    deletePosition(playerInfo.x,playerInfo.y,playerInfo.r);

    if (playerInfo.playerId === socket.id) {
        stopMove();
        modalInit();
        // for (let i = playersArray.length - 1; i >= 0; i--) {
        //     if (playersArray[i].playerId === socket) {
        //         console.log(playersArray[i]);
        //         if (i > -1) {
        //             playersArray.splice(i, 1);
        //         }
        //     }
        // }
    }
};

 function stopMove() {
    canvas.removeEventListener("mousemove", movePlayer, false);
    // alert("Game Over!")
};

function modalInit() {
    modal = document.querySelector('.modal');
    window.addEventListener('mousemove', () => {
        modal.classList.add('modal--open');
    });
};

// player and food collision detection function 
export function handleCollisionFood() {
    // socket.on('food', function (foodCirclesArr) {
    // console.log(foodCirclesArr);
    //  }); //food socket ends here

    for (let i = foodCirclesArr.length - 1; i >= 0; i--) {

        dx = currentPlayer.x - foodCirclesArr[i].x;
        dy = currentPlayer.y - foodCirclesArr[i].y;

        distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (currentPlayer.r + 1) + foodCirclesArr[i].r) {

            if (currentPlayer.r + 1 > foodCirclesArr[i].r) {
                // removeFoodItem();
                deletePosition(foodCirclesArr[i].x,foodCirclesArr[i].y,foodCirclesArr[i].r);
                growPlayerMass();
                //update player's score
                score += 5;
                document.getElementById('score').innerHTML = "Score: " + score;
                //remove foodItem from array 
                if (i > -1) {
                    foodCirclesArr.splice(i, 1);
                }
                // socket.emit('removedFoodItem', { x: foodCirclesArr[i].x, y: foodCirclesArr[i].y, r: foodCirclesArr[i].r });
            }
        }
    }
}; //handleCollisionFood ends here

//function to grow current player's mass 
function growPlayerMass() {
    currentPlayer.r += extraMass;
    currentPlayer.draw(currentPlayer.r);
};