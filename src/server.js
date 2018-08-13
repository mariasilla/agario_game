var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io-client')('http://localhost');

app.get('/', function (reg, res) {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection',function(socket){
//    console.log('a user connceted');
// });

socket.on('connect', function () {
    console.log('a user connceted');

});

socket.on('event', function (data) { });
socket.on('disconnect', function () { });

http.listen(3000, function () {
    console.log('listening on *:3000');
});
