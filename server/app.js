const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
var messageMiddleware = require('./utils/message');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected.')
    

    //LISTENING TO SEE IF THE USER DISCONNECTS
    socket.on('disconnect', ()=>{
        console.log('Client disconnected.');
    });
    
    //SENDING A WELCOME MESSAGE
    socket.emit("newMessage", messageMiddleware.generateMessage('Admin','Welcome to the chat app'));
    
    socket.broadcast.emit("newMessage",messageMiddleware.generateMessage('Admin','A new user has joined'));
    
    
    //RECEIVING A NEW MESSAGE
    socket.on("createMessage", (message, callback)=>{
       console.log(message);
       io.emit('newMessage',messageMiddleware.generateMessage(message.from, message.text));
       callback();
    });
    
    socket.on('createLocationMessage', (coords)=>{
        console.log(coords.latitude, coords.longitude);
        io.emit('newLocationMessage', messageMiddleware.generateLocationMessage ('Admin', coords.latitude, coords.longitude));
    });
});


console.log(__dirname + '/../public');
console.log('');

server.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started.");
})