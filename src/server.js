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

let socketPlayersArrCoords = [];

//Socket.IO starts here
io.on('connection', function (socket) {
    //print connected user's id to console
    console.log('a user connceted: ' + socket.id);

    //print disconnected user's id to console
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.id);
    });

    //print out the chat message event
    socket.on('chat message', function (msg) {
        // sending to all clients except sender
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('coordinates', function (data) {
        // socket.emit('ball', data);
        // socket.broadcast.emit('ball', data);
        socketPlayersArrCoords.push(data);
        console.log(socketPlayersArrCoords);
        // console.log(data);
        
    })
});
//Socket.IO ends here


http.listen(3000, function () {
    console.log('listening on *:3000');
});

