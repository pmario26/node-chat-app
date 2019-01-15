const path = require('path');
const express = require('express');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);  
app.use(express.static(publicPath)); 

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('disconnect',()=> {
        console.log('User was disconnected');
    });
    // socket.emit('newEmail',{
    //     from: 'teste@example.com',
    //     text: 'teste teste',
    //     createAt: 123
    // });
    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail: ',newEmail);
    // });
    socket.emit('newMessage',{
        from:'jane',
        text:'hi',
        createAt: new Date().getTime()
    });
    socket.on('createMessage',(message)=> {
        console.log(message);
    })

});
 
server.listen(port,()=> {
    console.log(`server up on port:${port}`); 
})

