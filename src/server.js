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

//Socket.IO starts here
// (function() {

io.on('connection', function (socket) {

    //print connected user's id to console
    console.log('a user connected: ' + socket.id);

    // create a new player and add it to the players object
    players[socket.id] = {
        x: 0,
        y: 0,
        r: 12,
        playerId: socket.id
    };

    // send the players object(all players info) to the new player
    socket.emit('currentPlayers', players);

    //send new player's info to all other players 
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // console.log("PlayerID: " + players[socket.id].playerId + " PlayerX: " + players[socket.id].x);
    console.log(players);
    // console.log(players[socket.id]);


    socket.on('movePlayerCoordinates', function (data) {
        socket.broadcast.emit('draw', {
            x: data.x,
            y: data.y,
            r: data.r
        });
    });

    // when a player disconnects, remove them from the players object
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.id);
        // remove this player from the players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
        // console.log(players);
    });

});



//   }).call(this);


// io.on('connection', function (socket) {

//     // //print out the chat message event
//     // socket.on('chat message', function (msg) {
//     //     // sending to all clients except sender
//     //     socket.broadcast.emit('chat message', msg);
//     // });

//     socket.on('coordinates', function (data) {
//         socketPlayersArrCoords.push(data);
//         console.log(socketPlayersArrCoords);
//         socket.broadcast.emit(socketPlayersArrCoords);
//         // console.log(data);
//     });

//     socket.on('draw', function (data) {
//         socket.broadcast.emit('draw', data);
//     });
// });


//Socket.IO ends here


http.listen(3000, function () {
    console.log('listening on *:3000');
});

