const express = require('express');
const app = express();
const http = require('http').Server(app);
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
let dx;
let dy;
let newMass;
let score;

//Socket.IO starts here
io.on('connection', socket => {

    //print NEW connected user's id to console
    console.log('a NEW user is CONNECTED: ' + socket.id);

    // create a new player and add it to the players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 700) + 50,
        r: 20,
        color: 'rgb(' + random() + ',' + random() + ',' + random() + ')',
        playerId: socket.id
    };

    socket.emit('currentPlayers', players);

    socket.broadcast.emit('newPlayer', players[socket.id]); //CURRENT PLAYER 

    socket.on('playerMovement', onMovement);

    socket.on('disconnect', onDisconnect);

    //FOOD
    while (foodCirclesArray.length < foodNum) {
        foodItem = {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 700) + 50,
            r: 9
        };
        foodCirclesArray.push(foodItem)
    };
    socket.emit('food', foodCirclesArray);

}); //Socket.IO ends here

function onMovement(movementData) {
    let that = this;

    players[this.id].x = movementData.x;
    players[this.id].y = movementData.y;
    players[this.id].r = movementData.r;
    players[this.id].color = movementData.color;

    this.broadcast.emit('playerMoved', players[this.id]);
    Object.keys(players).forEach(function (id) {
        enemy = players[id];
        currentPlayer = players[that.id];

        if (currentPlayer.playerId !== enemy.playerId) {
            measureDistance();
            if (distance < (currentPlayer.r) + enemy.r) {

                switch (true) {
                    case (currentPlayer.r === enemy.r):
                        bothSameSize();
                        break;

                    case (currentPlayer.r > enemy.r):
                        playerBiggerThanEnemy();
                        break;

                    default:
                        enemyIsBiggerThanPlayer();

                }

            }
        };
        function measureDistance() {
            dx = currentPlayer.x - enemy.x;
            dy = currentPlayer.y - enemy.y;
            distance = Math.sqrt(dx * dx + dy * dy);
        };

        function bothSameSize() {
            that.emit('sameSize', dx, dy, currentPlayer, enemy);
            that.broadcast.emit('sameSize', dx, dy, currentPlayer, enemy);

        };

        function playerBiggerThanEnemy() {
            that.emit('removeEnemy', enemy);
            that.broadcast.emit('removeEnemy', enemy);
            delete players[id];
        };

        function enemyIsBiggerThanPlayer() {
            that.emit('removeCurrentPlayer', currentPlayer);
            that.broadcast.emit('removeCurrentPlayer', currentPlayer);
        };
    });
};

function onDisconnect() {
    console.log('user DISCONNECTED1: ' + this.id);
    this.broadcast.emit('userDisconnected', players[this.id]);
    delete players[this.id];
    console.log("Players After Disconnecting: ", players);
};

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function random(min = 0, max = 255) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
};

