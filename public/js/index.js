var socket = io();
socket.on('connect',function() {
    console.log('Connected to the server');
    // socket.emit('createEmail',{
    //     to: 'jen@email.com',
    //     text:'hey'
    // });
    socket.emit('createMessage',
    {from:'jane',
    text:'hi',
    createAt: new Date().getTime()});
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

// socket.on('newEmail',function(email){
//     console.log('New Email',email);
// });

socket.on('newMessage',function(message){
    console.log(message);
})