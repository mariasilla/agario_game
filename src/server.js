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

let players = {};

//Socket.IO starts here
// (function() {

io.on('connection', function (socket) {

    //print connected user's id to console
    console.log('a user connceted: ' + socket.id);

    // create a new player and add it to our players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        r: 12,
        playerId: socket.id
    };

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    console.log(players);


    socket.on('coordinates', function (data) {
        socket.broadcast.emit('draw', {
            x: data.x,
            y: data.y,
            r: data.r
        });
        // let id = socket.id;
        // let newPlayer = new Player(data.x, data.y, data.r, id);
        // players.push(newPlayer);
        // console.log(newPlayer);
    });
});

//   }).call(this);





// io.on('connection', function (socket) {

//     //print disconnected user's id to console
//     socket.on('disconnect', function () {
//         console.log('user disconnected: ' + socket.id);
//     });

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

