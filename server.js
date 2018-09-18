var express = require('express');
var SIO = require('socket.io');

var doctors = [];
var
var sockets=[];
var conversation=[];

var app = express();

var server = app.listen(3000,function(){
    console.log("started listening on port 3000");
});

app.use(express.static("public"));

var io = SIO(server);

io.on('connection',function(socket){
    
    //ajouter la socket à la liste des sockets
    sockets[sockets.length]=socket;

   
});

