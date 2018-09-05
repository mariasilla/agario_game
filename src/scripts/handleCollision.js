import { foodCirclesArr, extraMass, currentPlayer, socket, playersArray } from '../index.js';
import Ball from '../index.js';
import movePlayer from './player.js';
import deletePosition from './deleteCurrentPlayerPos.js'
import getPlayerByID from './getPlayerByID.js'
import { log } from 'util';

let score = 0;
let xtraScore = 5;
let modal;
let enemy;

export function handleOtherPlayersCollision() {

    socket.on('sameSize', onSameSize);

    socket.on('removeEnemy', onRemoveEnemy);

    socket.on('removeCurrentPlayer', onRemoveCurrentPlayer);

};


function onSameSize(dx, dy, playerInfo, enemyInfo) {

    //from https://stackoverflow.com/questions/17600668/keeping-circles-from-overlapping
    const distance = Math.sqrt(dx * dx + dy * dy);
    //compute the amount you need to move
    const step = enemyInfo.r + playerInfo.r - distance;

    //normalize the vector
    dx /= distance; dy /= distance;

    // and then move the two centers apart
    playerInfo.x += dx * step / 2;
    playerInfo.y += dy * step / 2;
    // deletePosition(playerInfo.x, playerInfo.y, playerInfo.r);
    currentPlayer.draw(playerInfo.x, playerInfo.y);

    for (let i = playersArray.length - 1; i >= 0; i--) {

        const enemyFound = getPlayerByID(enemyInfo.playerId);

        enemy = new Ball(enemyFound.x, enemyFound.y, enemyFound.r, enemyFound.color);
        enemy.draw();
        addEnemy();

        function addEnemy() {
            if (enemyFound
                && enemyInfo.playerId === socket.id) {

                deletePosition(enemyFound.x, enemyFound.y, enemyFound.r);
                enemy = enemyFound;
                enemyInfo.x -= dx * step / 2;
                enemyInfo.y -= dy * step / 2;
            }

        }

    };

};

function onRemoveEnemy(enemyInfo) {
    deletePosition(enemyInfo.x, enemyInfo.y, enemyInfo.r);
    if (enemyInfo.playerId === socket.id) {
        stopMove();
        modalInit();
    }

    for (let i = playersArray.length - 1; i >= 0; i--) {

        if (enemyInfo.playerId === playersArray[i].playerId) {

            playersArray.splice(i, 1);

        }

    }

};

function onRemoveCurrentPlayer(playerInfo) {

    deletePosition(playerInfo.x, playerInfo.y, playerInfo.r);

    if (playerInfo.playerId === socket.id) {
        stopMove();
        modalInit();
    }
};

function stopMove() {
    canvas.removeEventListener("mousemove", movePlayer, false);
};

function modalInit() {
    modal = document.querySelector('.modal');
    window.addEventListener('mousemove', () => {
        modal.classList.add('modal--open');
    });
};

//circle collision from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export function handleCollisionFood() {

    for (let i = foodCirclesArr.length - 1; i >= 0; i--) {

        const dx = currentPlayer.x - foodCirclesArr[i].x;
        const dy = currentPlayer.y - foodCirclesArr[i].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (currentPlayer.r + 1) + foodCirclesArr[i].r) {
            deletePosition(foodCirclesArr[i].x, foodCirclesArr[i].y, foodCirclesArr[i].r);
            growPlayerMass();
            score += xtraScore;
            document.getElementById('score').innerHTML = "Score: " + score;
            foodCirclesArr.splice(i, 1);
        }
    }
};

function growPlayerMass() {
    currentPlayer.r += extraMass;
    currentPlayer.draw(currentPlayer.r);
};

