
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
let app = express();
const PublicPath = path.join(__dirname,'/../Public')
app.use(express.static( PublicPath ));

let server = http.createServer(app);
const port = process.env.PORT || 3000 ;

let io = socketIO(server);   // that's why instance of server 'server' is created 

io.on('connection',(socket)=>{
    console.log('A new user is connected....');
    socket.on('disconnect',()=>{
        console.log('User was disconnected....');
    })

})




server.listen(  port , ()=>{
    console.log('App is running at port 3000!!')
})