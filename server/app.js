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
    
    socket.on('disconnect', ()=>{
        console.log('Client disconnected.')
    })
});

// app.get('/', (req,res)=>{
//     render()
// })



console.log(__dirname + '/../public');
console.log('');

server.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started.");
})