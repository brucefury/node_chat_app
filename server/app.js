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
    
    //SENDING AN E-MAIL TO THE USER
    socket.emit('newEmail',{
        from:"biotch",
        text:"whatthe fuck?",
        createAt:1223456
    });
    //LISTENING TO THE USER, WAITING FOR AN EVENT
    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });
    //LISTENING TO SEE IF THE USER DISCONNECTS
    socket.on('disconnect', ()=>{
        console.log('Client disconnected.')
    });
    
    //SENDING A NEW MESSAGE
    socket.emit("newMessage", {
        user:'Bruce',
        message:"I'm tired of your shit.",
        createAt:new Date
    });
    
    //RECEIVING A NEW MESSAGE
    socket.on("createMessage", (message)=>{
       message.createAt = new Date;
       console.log(message);
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