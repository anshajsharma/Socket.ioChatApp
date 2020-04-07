
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

    socket.emit('newMessage',{
        from: "Admin",
        text : "Welcome to the chat app!",
        createdAt: new Date().getTime()
    })  // will send message to new user joined....



    socket.broadcast.emit('newMessage',{
        from: "Admin",
        text : "New User Joined !!",
        createdAt: new Date().getTime()
    })   // Will inform all others that new user joined

    socket.on('createMessage',(message)=>{
       console.log("createMessage" , message) 
       io.emit('newMessage',{
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
       })                     //Will emit or broadcast to all user connected to server
    })

    socket.emit('newMessage',{
        from: "Anshaj",
        text: "How are you...2354"
    });


    socket.on('disconnect',()=>{
        console.log('User was disconnected....');
    })

})




server.listen(  port , ()=>{
    console.log('App is running at port 3000!!')
})