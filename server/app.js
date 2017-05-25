const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

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
    socket.emit("newMessage", {
        user:'Admin',
        message:"Welcome to the Chat App!",
        createAt:new Date().getTime()
    });
    
    socket.broadcast.emit("newMessage", {
        user:'Admin',
        message:"A new user has joined!",
        createAt:new Date().getTime()
    });
    
    
    //RECEIVING A NEW MESSAGE
    socket.on("createMessage", (message)=>{
       console.log(message);
    //   io.emit('newMessage',{
    //       from:message.from,
    //       text:message.text,
    //       createAt:new Date().getTime()
    //   });
        socket.broadcast.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });
    });
    
});

// app.get('/', (req,res)=>{
//     render()
// })



console.log(__dirname + '/../public');
console.log('');

server.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started.");
})