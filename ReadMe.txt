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



