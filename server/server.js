const express = require('express');
const path = require('path');
var app = express();

const PublicPath = path.join(__dirname,'/../Public')

app.use(express.static( PublicPath ));

app.listen(3000 , ()=>{
    console.log('App is running at port 3000!!')
})