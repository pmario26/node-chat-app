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

    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app',            
        createdAt:new Date().getTime()

    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User Joined',
        createdAt:new Date().getTime()

    })
    
    // socket.emit('newMessage',{
    //     from:'jane',
    //     text:'hi',
    //     createAt: new Date().getTime()
    // });
    socket.on('createMessage',(message)=> {
        console.log(message);
        // io.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt:new Date().getTime()
        // });
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt:new Date().getTime()
        })
    })

});
 
server.listen(port,()=> {
    console.log(`server up on port:${port}`); 
})

