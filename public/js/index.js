let socket = io();
socket.on('connect',()=>{
     console.log('Connected to server....');

    //  socket.emit('createMessage',{
    //      from: "Anshaj",
    //      text: "How are you..."
    //  })
 
})
 socket.on('disconnect',()=>{
          console.log('Disconnected from the server....');
 })

 socket.on('newMessage', (message)=>{
     console.log("newMessage",message);
 })