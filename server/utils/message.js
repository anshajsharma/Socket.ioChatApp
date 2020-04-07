let generateMessage = (from , text) => {
  return {
      from,
      text,
      createdAt: new Date().getTime()
  }
}
let generateLocationMessage = (from,lat,lgn) =>{
    return {
        from,
        url: `https://www.google.com/maps?q=${lat}, ${lgn}`,
        createdAt: new Date().getTime() 
    }
}

module.exports = {generateMessage,generateLocationMessage};