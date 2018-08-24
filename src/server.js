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
let playersArray = [];
let newMass;
let score;

//Socket.IO starts here
io.on('connection', function (socket) {

    //print NEW connected user's id to console
    console.log('a NEW user is CONNECTED: ' + socket.id);

    // create a new player and add it to the players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 700) + 50,
        r: 20,
        color: this.color,
        playerId: socket.id
    };

    playersArray.push(players[socket.id]);
    socket.emit('playersArray', playersArray);
    // console.log(playersArray);


    // send the players object(all players info) to the new player
    socket.emit('currentPlayers', players);
    // console.log(players);


    //send new player's info to all other current players 
    socket.broadcast.emit('newPlayer', players[socket.id]); //CURRENT PLAYER 

    //Listen for new player movement event
    // when a player MOVES, update the player's data
    socket.on('playerMovement', function (movementData) {
        for (let i = playersArray.length - 1; i >= 0; i--) {

            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].r = movementData.r;

            if (playersArray[i].playerId !== socket.id) {

                dx = players[socket.id].x - playersArray[i].x;
                dy = players[socket.id].y - playersArray[i].y;
                distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (players[socket.id].r) + playersArray[i].r) {
                    bothSameSize();
                    enemyIsBiggerThanPlayer();
                    playerBiggerThanEnemy();
                    console.log("Collision detected!");
                }

            }
            //**************************************************
            //1.if Enemy and Player are the SAME SIZE
            function bothSameSize() {
                if (players[socket.id].r == playersArray[i].r) {
                    socket.emit('sameSize', players[socket.id], playersArray[i]);
                    socket.broadcast.emit('sameSize', players[socket.id], playersArray[i]);
                }
            };
            //2.if Enemy is bigger than current Player
            function enemyIsBiggerThanPlayer() {
                if (playersArray[i].r > players[socket.id].r) {
                    //remove enemy from current player canvas 
                    // let message = "Game Over!";
                    // socket.emit('message', message);
                    socket.emit('removeCurrentPlayer', players[socket.id]);
                    socket.broadcast.emit('removeCurrentPlayer', players[socket.id]);
                    let index = playersArray.indexOf(players[socket.id]);
                    if (index > -1) {
                        playersArray.splice(index, 1);
                    }
                }
            };
            //3.if current Player is Bigger/ remove the Enemy
            function playerBiggerThanEnemy() {
                if (players[socket.id].r > playersArray[i].r) {
                    let message = "Game Over!";
                    socket.broadcast.emit('message', message);
                    //remove enemy from current player canvas 
                    socket.emit('removeEnemy', playersArray[i]);
                    socket.broadcast.emit('removeEnemy', playersArray[i]);
                    if (i > -1) {
                        playersArray.splice(i, 1);
                    }
                }
            }
        }; // collision loop ends here

        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });


    // send the current score
    // socket.emit('scoreUpdate', score);

    //DISCONNECT CURRENT PLAYER - when a player Disconnects, remove them from the players object
    socket.on('disconnect', function () {
        console.log('user DISCONNECTED: ' + socket.id);
        // remove this player from the players object
        delete players[socket.id];
        // console.log(players);
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    //FOOD
    // socket.on('updatedFoodCirclesArr', function () {
    while (foodCirclesArray.length < 25) {
        foodItem = {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 700) + 50,
            r: 9
        };
        foodCirclesArray.push(foodItem)
    };
    // });
    socket.emit('food', foodCirclesArray);

}); //Socket.IO ends here

http.listen(3000, function () {
    console.log('listening on *:3000');
});

