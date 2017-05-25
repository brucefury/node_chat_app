const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(publicPath));

// app.get('/', (req,res)=>{
//     render()
// })



console.log(__dirname + '/../public');
console.log('');

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started.");
})