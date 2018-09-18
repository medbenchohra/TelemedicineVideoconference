var express   =   require('express');
var SIO   =   require('socket.io');

var users   =   [];
var sockets  =  [];
var conversations = [];

var app  =  express();

var server  =  app.listen(3000,function(){
    console.log("started listening on port 3000");
});

app.use(express.static("public"));

var io  =  SIO(server);

io.on('connection',function(socket){
    
    //ajouter la socket à la liste des sockets
    sockets[sockets.length] = socket;

   
});


//creer un nouveau utilisateur de type medecin 
function newUseer(speciality,firstName, lastName){
    return {
        speciality : speciality,
        firstName : firstName,
        lastName : lastName
    };
}


function conversation(initiator){
    this.initiator = initiator;
    this.moderator = null;
    this.participants = [];
}

function findSocket(socketId){
    var i = 0;
    while((i<socket.length)&&(sockets[i].id! = socketId)){i++;}
    if(i<sockets.length)return socket[i];
    return false;
}

function findConversationById(participentId){
    var i = 0;
    while(i<conversations.length){
        if(inConversation(participentId,conversations[i])){
            return conversations[i];
        }
    }
    return false;
}

function inConversation(participentId,conversation){
   return (conversation.participants.indexOf(participentId)>0);
}

function isBusy(UserId){
    if(findConversationById(UserId)) return true;
    return false;
}

function removeUser(userId){
    users[findUserIndexById(userId)]  =  users[users.length-1];
    users.pull();
}

function findUserIndexById(userId){
    var i  =  0;
    while ((i<users.length)&&(userId  !=  users[i].id)){i++;}
    if (i<users.length) return i;
    return false;
}


