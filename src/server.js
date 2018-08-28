const express = require('express');
const app = express();
const http = require('http').Server(app);
// const socket = require('socket.io-client')('http://localhost:3000');
const io = require('socket.io')(http);
const path = require('path');
const randomColor = require('randomcolor');
let ranColor = randomColor(); // a hex code for an attractive color


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
// let playersArray = [];
let foodNum = 25;
let newMass;
let score;

//Socket.IO starts here
io.on('connection', function (socket) {

    //print NEW connected user's id to console
    console.log('a NEW user is CONNECTED: ' + socket.id);
    //FOOD
    // socket.on('removedFoodItem', function (item) {
    //     console.log(item);
    //     // socket.broadcast.emit('removedFoodCoords', item)
    // });

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
        color: ranColor,
        playerId: socket.id
    };

    // playersArray.push(players[socket.id]);
    // socket.emit('playersArray', playersArray);
    // console.log(playersArray);


    // send the players object(all players info) to the new player
    socket.emit('currentPlayers', players);
    // console.log(players);


    //send new player's info to all other current players 
    socket.broadcast.emit('newPlayer', players[socket.id]); //CURRENT PLAYER 

    //Listen for new player movement event
    // when a player MOVES, update the player's data
    socket.on('playerMovement', function (movementData) {

        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].r = movementData.r;

        // for (let i = playersArray.length - 1; i >= 0; i--) {
        Object.keys(players).forEach(function (id) {

            if (players[id].playerId !== socket.id) {

                dx = players[socket.id].x - players[id].x;
                dy = players[socket.id].y - players[id].y;
                distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (players[socket.id].r + 1) + players[id].r) {
                    if (players[socket.id].r === players[id].r) {
                        bothSameSize();
                    } else if (players[socket.id].r > players[id].r) {
                        // enemyIsBiggerThanPlayer();
                        playerBiggerThanEnemy();
                    }
                    else {
                        enemyIsBiggerThanPlayer();
                    }
                    console.log("Collision detected!");
                }

            };
            //**************************************************
            //1.if Enemy and Player are the SAME SIZE
            function bothSameSize() {
                socket.emit('sameSize', players[socket.id], players[id]);
                socket.broadcast.emit('sameSize', players[socket.id], players[id]);
            };
            //2.if current Player is Bigger/ remove the Enemy
            function playerBiggerThanEnemy() {
                socket.emit('removeEnemy', players[id]);
                socket.broadcast.emit('removeEnemy', players[id]);
                delete players[id];
                // if (i > -1) {
                //     playersArray.splice(i, 1);
                // }
            };
            //3.if Enemy is bigger than current Player
            function enemyIsBiggerThanPlayer() {
                socket.emit('removeCurrentPlayer', players[socket.id]);
                socket.broadcast.emit('removeCurPlayerFromOtherCanvases', players[socket.id]);
                delete players[socket.id]
                // let index = playersArray.indexOf(players[socket.id]);
                // if (index > -1) {
                //     playersArray.splice(index, 1);
                // };
                // socket.broadcast.emit('playersArray', playersArray);
            };
        });
        // }; // players collision loop ends here

        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    }); //playerMovement socket ends here

    //DISCONNECT CURRENT PLAYER - when a player Disconnects, remove them from the players object
    socket.on('disconnect', function () {
        // emit a message to all players to remove this player
        console.log('user DISCONNECTED: ' + socket.id);
        socket.broadcast.emit('userDisconnected', players[socket.id]);
        // remove this player from the players object
        delete players[socket.id];
        // socket.broadcast.emit('userDisconnected', socket.id);
        console.log(players);

        // io.emit('disconnect', socket.id);
        // io.emit('myCustomEvent', {customEvent: 'Custom Message'})
    });
}); //Socket.IO ends here

http.listen(3000, function () {
    console.log('listening on *:3000');
});

