
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
let app = express();
const PublicPath = path.join(__dirname,'/../Public')
app.use(express.static( PublicPath ));
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

var {generateMessage,generateLocationMessage} = require('./utils/message');

let server = http.createServer(app);
const port = process.env.PORT || 3000 ;

let io = socketIO(server);   // that's why instance of server 'server' is created 
let users = new Users();
// generateMessage(message.from,message.text)
io.on('connection',(socket)=>{
   

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback('Name and room are required');
        }
        console.log('A new user is connected....');
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
    
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
    
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
    
        callback();
      })

    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app!"))  // will send message to new user joined....



    socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined !!"))   // Will inform all others that new user joined

    socket.on('createMessage',(message ,callback)=>{
    //    console.log("createMessage" , message) 
    //    io.emit('newMessage',generateMessage(message.from,message.text)); 
    //                      //Will emit or broadcast to all user connected to server
    // callback('This is server');

    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback('This is the server:');

    })

    socket.on('createLocationMessage',(coordinate)=>{
        // io.emit('newLocationMessage',generateLocationMessage("Admin",coordinate.lat , coordinate.lng));
        let user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coordinate.lat, coordinate.lng))
    }
    
    })

    socket.on('disconnect',()=>{
        console.log('User was disconnected....');
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
          }
    })

})




server.listen(  port , ()=>{
    console.log('App is running at port 3000!!')
})