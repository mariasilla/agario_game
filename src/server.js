const express = require('express');
const app = express();
const http = require('http').Server(app);
// const socket = require('socket.io-client')('http://localhost:3000');
var io = require('socket.io')(http);
const path = require('path');

// app.use(express.static(path.join(__dirname, 'src')));

app.get('/dist/build.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/build.js'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function (socket) {
    // console.log('a user connceted');
    // socket.on('disconnect', function () {
    //     console.log('user disconnected');
    // });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
