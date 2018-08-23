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

    //Listen for new playerMovement event
    // when a player MOVES, update the player data
    socket.on('playerMovement', function (movementData) {
        for (let i = playersArray.length - 1; i >= 0; i--) {

            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].r = movementData.r;

            if (playersArray[i].playerId !== socket.id) {

                dx = players[socket.id].x - playersArray[i].x;
                dy = players[socket.id].y - playersArray[i].y;
                // console.log(players[socket.id].x, playersArray[i].x);

                distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (players[socket.id].r + 1) + playersArray[i].r) {

                    playerBiggerThanEnemy();
                    enemyIsBiggerThanPlayer();
                    // } else {
                    //     //if Enemy ATE you
                    //     socket.emit('message', "Game Over!");
                    //     socket.emit('removeYourselfFromOtherPlayersCanvas', players[socket.id]);
                    //     //send GAME OVER to client and stop emitting this player's movements
                    //     //remove yourself from canvas
                    // }
                    console.log("Collision detected!");
                }

            } //if statement ends here
            //**************************************************
            //1.if current Player is bigger & ate the enemy
            function playerBiggerThanEnemy() {
                if (players[socket.id].r + 1 > playersArray[i].r) {
                    //remove enemy from current player canvas 
                    socket.emit('removeEnemy', playersArray[i]);
                    socket.broadcast.emit('removeEnemy', playersArray[i]);
                    if (i > -1) {
                        playersArray.splice(i, 1);
                    }
                }
            }

            //2.if Enemy is bigger than current player
            // function enemyIsBiggerThanPlayer() {
            //     if (playersArray[i].r + 1 > players[socket.id].r) {
            //         //remove enemy from current player canvas 
            //         socket.emit('removeCurrentPlayer', players[socket.id]);
            //         socket.emit('removeCurrentPlayer', players[socket.id]);
            //         socket.broadcast.emit('removeCurrentPlayer', players[socket.id]);
            //         let index = playersArray.indexOf(players[socket.id]);
            //         if (index > -1) {
            //             playersArray.splice(index, 1);
            //         }
            //     }
            // }
            //3.if Enemy and Player are the same size

        } // collision loop ends here

        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });


    // send the current score
    // socket.emit('scoreUpdate', score);

    // socket.on('movePlayerCoordinates', function (data) {
    //     socket.broadcast.emit('draw', {
    //         x: data.x,
    //         y: data.y,
    //         r: data.r
    //     });
    // });

    //DISCONNECT CURRENT PLAYER - when a player Disconnects, remove them from the players object
    socket.on('disconnect', function () {
        console.log('user DISCONNECTED: ' + socket.id);
        // remove this player from the players object
        delete players[socket.id];
        // console.log(players);
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    //food

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


});

//Socket.IO ends here

http.listen(3000, function () {
    console.log('listening on *:3000');
});

