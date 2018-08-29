const express = require('express');
const app = express();
const http = require('http').Server(app);
// const socket = require('socket.io-client')('http://localhost:3000');
const io = require('socket.io')(http);
const path = require('path');


// app.use(express.static(path.join(__dirname, 'src')));

app.get('/dist/build.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/build.js'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Object to keep track of all the players that are currently in the game
let players = {};
let foodCirclesArray = [];
let foodNum = 25;
let currentPlayer;
let enemy;
let distance;
let newMass;
let score;

//Socket.IO starts here
io.on('connection', socket => {

    //print NEW connected user's id to console
    console.log('a NEW user is CONNECTED: ' + socket.id);

    //FOOD
    while (foodCirclesArray.length < foodNum) {
        foodItem = {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 700) + 50,
            r: 9
        };
        foodCirclesArray.push(foodItem)
    };
    socket.emit('food', foodCirclesArray); // FOOD ends here

    // create a new player and add it to the players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 700) + 50,
        r: 20,
        color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        playerId: socket.id
    };

    // send the players object(all players info) to the new player
    socket.emit('currentPlayers', players);
    // console.log(players);


    //send new player's info to all other current players 
    socket.broadcast.emit('newPlayer', players[socket.id]); //CURRENT PLAYER 

    //Listen for new player movement event
    // when a player MOVES, update the player's data
    // socket.on('playerMovement', onMovement);

    socket.on('playerMovement', movementData => {

        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].r = movementData.r;
        players[socket.id].color = movementData.color;

        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);

        Object.keys(players).forEach(function (id) {
            currentPlayer = players[socket.id];
            enemy = players[id];

            if (currentPlayer.playerId !== enemy.playerId) {
                // console.log("current player id: " + currentPlayer.playerId);
                // console.log("enemy id: " + enemy.playerId);
                measureDistance();
                if (distance < (currentPlayer.r) + enemy.r) {
                    if (currentPlayer.r === enemy.r) {
                        bothSameSize();
                    } else if (currentPlayer.r > enemy.r) {
                        // enemyIsBiggerThanPlayer();
                        playerBiggerThanEnemy();
                    }
                    else {
                        enemyIsBiggerThanPlayer();
                    }
                    console.log("Collision detected!");
                }
            };

            function measureDistance() {
                dx = currentPlayer.x - enemy.x;
                dy = currentPlayer.y - enemy.y;
                distance = Math.sqrt(dx * dx + dy * dy);
            };
            //**************************************************
            //1.if Enemy and Player are the SAME SIZE
            function bothSameSize() {
                socket.emit('sameSize', currentPlayer, enemy);
                socket.broadcast.emit('sameSize', currentPlayer, enemy);

            };
            //2.if current Player is Bigger/ remove the Enemy
            function playerBiggerThanEnemy() {
                socket.emit('removeEnemy', enemy);
                socket.broadcast.emit('removeEnemy', enemy);
                delete players[id];
                // socket.broadcast.emit('currentPlayers', players);
            };
            //3.if Enemy is bigger than current Players
            function enemyIsBiggerThanPlayer() {
                socket.emit('removeCurrentPlayer', currentPlayer);
                socket.broadcast.emit('removeCurrentPlayer', currentPlayer);
                // socket.broadcast.emit('removeCurPlayerFromOtherCanvases', players[socket.id]);
                delete players[socket.id];
                // socket.broadcast.emit('currentPlayers', players);
            };
        });
        // }; // players collision loop ends here

    }); //playerMovement socket ends here

    //DISCONNECT CURRENT PLAYER - when a player Disconnects, remove them from the players object
    socket.on('disconnect', onDisconnect);

}); //Socket.IO ends here

function onDisconnect() {
    // emit a message to all players to remove this player
    console.log('user DISCONNECTED1: ' + this.id);
    this.broadcast.emit('userDisconnected', players[this.id]);
    // remove this player from the players object
    delete players[this.id];
    // socket.broadcast.emit('userDisconnected', socket.id);
    console.log(players);


    // io.emit('disconnect', socket.id);
    // io.emit('myCustomEvent', {customEvent: 'Custom Message'})
}

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
