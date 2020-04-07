let socket = io();
socket.on('connect',()=>{
     console.log('Connected to server....');

     socket.emit('createMessage',{
         from: "Anshaj",
         text: "How are you..."
     },(message)=>{
         console.log("Got it..." + message)
     })
 
})
 socket.on('disconnect',()=>{
          console.log('Disconnected from the server....');
 })

 socket.on('newMessage', (message)=>{
     console.log("newMessage",message);
 })

 document.querySelector('#submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
  
    socket.emit("createMessage", {
      text: document.querySelector('input[name="message"]').value
    }, function() {
      document.querySelector('input[name="message"]').value = '';
    })
  })


  // Obtaining and sending data of location to server
  document.querySelector('#send-location').addEventListener('click', function(e) {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
    }
  
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, () => {
      alert('Unable to fetch location.')
    })
  });