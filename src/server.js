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


//Socket.IO starts here
io.on('connection', function (socket) {

    //print NEW connected user's id to console
    console.log('a NEW user is CONNECTED: ' + socket.id);

    // create a new player and add it to the players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 700) + 50,
        r: 20,
        playerId: socket.id
    };

    //food
    // socket.on('foodCoords', function () {
        while (foodCirclesArray.length < 25) {
            foodItem = {
                x: Math.floor(Math.random() * 700) + 50,
                y: Math.floor(Math.random() * 700) + 50,
                r: 9
            };
            foodCirclesArray.push(foodItem)
        };
        console.log(foodCirclesArray);
        
        socket.emit('food', foodCirclesArray);
    // });

    // send the players object(all players info) to the new player
    socket.emit('currentPlayers', players);
    // console.log(players);


    //send new player's info to all other current players 
    socket.broadcast.emit('newPlayer', players[socket.id]); //CURRENT PLAYER 

    //Listen for new playerMovement event
    // when a player MOVES, update the player data
    socket.on('playerMovement', function (movementData) {
        // console.log(players[socket.id].x);
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].r = movementData.r;
        // console.log(players);

        Object.keys(players).forEach(function (id) {
            if (players[id].playerId !== socket.id) {
                // console.log("Current Player ID: " + players[socket.id].playerId,
                //     "ENEMY ID: " + players[id].playerId);

                dx = players[socket.id].x - players[id].x;
                dy = players[socket.id].y - players[id].y;
                distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (players[socket.id].r + 1) + players[id].r) {

                    //if you/current ATE the enemy
                    if (players[socket.id].r + 1 > players[id].r) {
                        // growPlayerMass();
                        //update player's score
                        // score += 5;
                        // document.getElementById('score').innerHTML = "Score: " + score;
                        // remove item and disconnect the user from socket.io session 
                        // let i = Object.keys(playersClient).indexOf(id);
                        // if (i > -1) {
                        //     Object.keys(playersClient).splice(i, 1);
                        // }
                        // socket.on('disconnect', function () {
                        //     console.log('user DISCONNECTED: ' + players[id].playerId);
                        //     // remove this player from the players object
                        // delete players[id];
                        //     console.log(players);
                        //     // emit a message to all players to remove this player
                        //     io.emit('disconnect', players[id].playerId);
                        // });
                        // console.log("ENEMY id: " + players[id].playerId);
                        // remove Enemy from the players object
                        // delete players[id];
                        // console.log(players);
                        //remove enemy/other player from canvas 
                        socket.emit('removeEnemy', players[id]);
                        // socket.emit('removePlayer', players[socket.id]);
                    } else {
                        //if Enemy ATE you
                        // socket.emit('removePlayer', players[socket.id]);
                        //send GAME OVER to client and stop emitting this player's movements
                        //remove yourself from canvas
                    }
                    console.log("Collision detected!");
                }
            } //if statement ends here
        }); // collision loop ends here


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
        console.log(players);
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    // //DISCONNECT OTHER PLAYER on collision with other player
    // socket.on('disconnectOtherPlayer', function (data) {
    //     io.sockets.connected[data].disconnect();
    //     // io.emit('disconnectOtherPlayer', data);
    // });

});

//Socket.IO ends here

http.listen(3000, function () {
    console.log('listening on *:3000');
});

