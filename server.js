var express   =   require('express');
var SIO   =   require('socket.io');

var users   =   [];
var sockets  =  [];
var conversations = [];
var programmedConversations = [];


var app  =  express();

var server  =  app.listen(3000,function(){
    console.log("started listening on port 3000");
});

app.use(express.static("public"));

var io  =  SIO(server);

io.on('connection',function(socket){
    
    //ajouter la socket à la liste des sockets
    sockets[sockets.length] = socket;

    /// login
    socket.on("login",function(data){
        login(data.userName,data.pass,socket);
    });


    /// join 
    socket.on("join", function(data){

    })

   
});

function  login(userName,pass,socket){
    // a changer avec l'arrive de la base de données 
    ///-----------------------------------------------
    if(pass){
        var userInstance = new user(userName,socket);
        sendConversationList(userInstance);

        users.push(userInstance);
    }else{
        console.log("pass wrong");
    }
    ///-------------------------------------------


}

function logout(userId){

}

function join(convId,userId){
    var userIndex = findUserIndexById(userId);
    if(userIndex){
        var convIndex = findConversationById(convId);
        if(convIndex){
            conversations[convIndex].broadcast("join",{senderId : userId});
            conversations[convIndex].add(users[userIndex]);
        }else{
            console.log("converssation doesn't exist");
        }
    }else{
        console.log("user doesn't exist");
    }
}

function leave(conv,userId){
    var convIndex = findConversationById(convId);
    if(convIndex){
        conversations[convIndex].remove(userId);
    }else{
        console.log("converssation doesn't exist");
    }
}


//// classess //////////////////////////////////////////////////////////
/// classe: conversation
function conversation(moderator,id){
    //properrties
    this.id = id;
    this.moderator = moderator;
    this.memebers = [];

    //methods
    this.add = addMemeber;
    this.remove = removeMemeber;
    this.get = getMemeber;
    this.getIndex = getMemeberIndex;
    this.broadcast = broadcast;
}
// classe conversation : methods
function addMemeber(user){
    this.memebers[this.memebers.length] = user;
}

function removeMemeber(userId){
    var i = this.getMemeberIndex(userId);
    if(i){
        this.memebers[i]=this.members[this.memebers.length - 1];
        this.memebers.pop();
    }else{
        console.log("user doesn't exist");
    }
}

function getMemeberIndex(userId){
    var i=0;
    while((i<this.memebers.length)&&(this.memebers[i].socket.id!=userId))i++;
    if(i<this.memebers.length)return i;
    return false;
}

function getMemeber(userId){
    var i = this.getMemeberIndex(userId);
    if(i){
        return this.memebers[i];
    }else{
        console.log("user doesn't exist");
    }
}

function broadcast(event,data,convId){
    this.moderator.emit(event,data);
    for(user in this.memebers){
        user.socket.emit(event,data);
    }
}

///////////////////////////////////////////////
///class: user
function user(userName,socket){
    //properties
    this.userName = userName;
    this.socket = socket;
}
////////////////////////////////////////////////////////////


////// helper functions //////////////////////////////////////////
function findUserIndexById(userId){
    var i  =  0;
    while ((i<users.length)&&(userId  !=  users[i].socket.id))i++;
    if (i<users.length) return i;
    return false;
}

function findConversationById(convId){
    var i = 0;
    while((i<conversations.length)&&(conversations[i].id!=convId))i++;
    if(i<conversations.length)return i;
    return false;
}

function removeUser(userId){
    users[findUserIndexById(userId)]  =  users[users.length-1];
    users.pop();
}

function findSocket(socketId){
    var i = 0;
    while((i<socket.length)&&(sockets[i].id != socketId)){i++;}
    if(i<sockets.length)return socket[i];
    return false;
}


function sendConversationList(user){

    for(var conversation in programedConversations){
      
      if (-1<conversation.members.indexof(user.userName)){
 
          user.socket.emit('conversation',{conversation:conversation});
      }
    }
 
 }

 
//////////////////////////////////////////////////////////////////////
/*

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



function findUserIndexById(userId){
    var i  =  0;
    while ((i<users.length)&&(userId  !=  users[i].socket.id))i++;
    if (i<users.length) return i;
    return false;
}

*/
