Level by level Comments:

///////////////////////////LEVEL 1:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

Socket.io installed and an instance of server is created using inbuild library 'http'

Added connect and disconnect event listner...

Emitting and Listening of events done...
i.e. communication b/w virtual user and virtual database done..

Socket is for single user connection while
IO corrosponds to all user connected to server....

io.emit                 will send message to all user connected(including sender)..
socket.broadcast.emit   will send message to all except sender..
socket.emit             will send message only to current user..

installed "expect mocha" for testing purpose...
i.e. testing functions before using it...

Used Moment.js for handeling timestamps...
// Used moment.js library to format time from timestamp
// moment(message.createdAt).format('LT')  9:57AM


// Used Mustache.js for rendering script containing HTML..
// Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  // Here templete is 'HTML' template which can contain 
       {{from}} {{text}} etc because we are proving these variable while rendering....

socket.join(roomID) --> will help to join a specific and isolated roomID..
io.to(roomID).emit('message') --> will send message only to specific roomID