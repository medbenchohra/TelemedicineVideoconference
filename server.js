var express   =   require('express');
var SIO   =   require('socket.io');

var users   =   [];
var sockets  =  [];
var conversations = [];

//des données de test pour les conversation programmées
var programmedConversations = [
    {
        id:0,
        title : "conversation 1",
        moderator : "charef",
        members : [
            "faysal",
            "chohra"
        ],
        time : new Date()
    },
    {
        id:1,
        title : "conversation 2",
        moderator :"chohra" ,
        members : [
            "charef",
            "faysal"  
        ],
        time : new Date()
    },
    {
        id:2,
        title : "conversation 3",
        moderator : "faysal",
        members : [
            "charef",
            "chohra"
        ],
        time : new Date()
    },
    {
        id:3,
        title : "conversation 4",
        moderator : "faysal",
        members : [
            "charef",
            "chohra"
        ],
        time : new Date()
    },
    {
        id:4,
        title : "conversation 5",
        moderator : "faysal",
        members : [
            "charef",
            "chohra"
        ],
        time : new Date()
    }
];



var app  =  express();

var server  =  app.listen(3000,function(){
    console.log("started listening on port 3000");
});

app.use(express.static("public"));

var io  =  SIO(server);

io.on('connection',function(socket){
    
    //ajouter la socket à la liste des sockets
    sockets[sockets.length] = socket;
    console.log("someone connected");

    /// login
    socket.on("login",function(data){
        console.log("user has logged in");
        login(data.userName,data.password,socket);
    });

    /// joindre une conversation 
    socket.on("join", function(data){
        console.log("user joined ")
        join(data.convId,socket.id);
    });

    /// quitter une conversation 
    socket.on("leave", function(data){
        leave(data.convId,socket.id);
    });

    /// deconnecter
    socket.on("logout",function(data){
        logout(socket.id);
    });

    ///dsp: envoyer la description de la session
    socket.on('dsp',function(data){
        dsp(data.description,socket.id,data.reseverId); 
    });;

    ///ice: envoyer le candidat ice
    socket.on('ice',function(data){
        ice(data.ice,socket.id,data.reseverId);
    });
   
});


///fonction de connection 
function  login(userName,password,socket){
    // a changer avec l'arrive de la base de données 
    ///-----------------------------------------------
    if(password){
        var userInstance = new user(userName,socket);
        sendConversationList(userInstance);

        users.push(userInstance);
    }else{
        console.log("pass wrong");
    }
    ///-------------------------------------------


}

/// fonction de deconnexion
function logout(userId){

}


/// fonction de joindre une conversation
function join(convId,userId){
    var userIndex = findUserIndexById(userId);
    if(userIndex>-1){
        var convIndex = findConversationById(convId);
        if(convIndex>-1){
            if(users[userIndex].socket.id!=conversation[convIndex].moderator.socket.id)
            conversations[convIndex].broadcast("join",{senderId : userId});
            conversations[convIndex].add(users[userIndex]);
        }else if(createConversation(convId,userId)){
            //join(convId,userId);
        }else{
            console.log("converssation doesn't exist");
        }
    }else{
        console.log("user doesn't exist");
    }
}

/// fonction de quitter une conversation
function leave(convId,userId){
    var convIndex = findConversationById(convId);
    if(convIndex>-1){
        conversations[convIndex].remove(userId);
        conversations[convIndex].broadcast('leave',{userId : userId});
    }else{
        console.log("converssation doesn't exist");
    }
}


///fonction d'envoie de la description de la session
function dsp(description,senderId,reseverId){

    var user=findUserIndexById(reseverId);
    users[user].socket.emit('dsp',{
        description:description,
        senderId:senderId
    });
     
}

/// fonction de l'envoi du candidat ice
function ice(ice,senderId,reseverId){
    var user=findUserIndexById(reseverId);
    users[user].socket.emit('ice',{
        ice:ice,
        senderId:senderId
    });
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
    if(i>-1){
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
    return -1;
}

function getMemeber(userId){
    var i = this.getMemeberIndex(userId);
    if(i>-1){
        return this.memebers[i];
    }else{
        console.log("user doesn't exist");
    }
}

function broadcast(event,data,convId){
    this.moderator.socket.emit(event,data);
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
    return -1;
}

function findConversationById(convId){
    var i = 0;
    while((i<conversations.length)&&(conversations[i].id!=convId))i++;
    if(i<conversations.length)return i;
    return -1;
}

function removeUser(userId){
    users[findUserIndexById(userId)]  =  users[users.length-1];
    users.pop();
}

function findSocket(socketId){
    var i = 0;
    while((i<socket.length)&&(sockets[i].id != socketId)){i++;}
    if(i<sockets.length)return socket[i];
    return -1;
}

function sendConversationList(user){
    console.log("sending concerned conversation list");
    for(var i in programmedConversations){
        if (isConcerned(user,programmedConversations[i]))
        {
            user.socket.emit('conversation',{conversation:programmedConversations[i]});
        }
    }
}

function isConcerned(user,conversation){
    var test1 = conversation.moderator == user.userName;
    var test2 = conversation.members.indexOf(user.userName)>-1;
    return test1 || test2;
}

function createConversation(convId,userId){
    var index = findProgrammedConversation(convId);
    if(index>-1){
        var moderatorIndex = findUserIndexByUsername(programmedConversations[index].moderator);
        if(moderatorIndex>-1){
            conversations.push(new conversation(users[moderatorIndex],
                programmedConversations[index].id));
            if(users[moderatorIndex].socket.id!=userId){
                join(convId,userId);
            }
            return true;
        }else{
            console.log("le moderateur n'est pas encore connecte");
        }
    }else{
        console.log("cette conversation n'existe pas");
    }
    return false;
}

function findUserIndexByUsername(userName){
    var i = 0;
    while((i<users.length)&&(users[i].userName!=userName))i++;
    if(i<users.length)return i;
    return -1;
}

function findProgrammedConversation(convId){
    var i=0;
    while((i<programmedConversations.length)&&(programmedConversations[i].id!=convId))i++;
    if(i<programmedConversations.length) return i;
    return -1;
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
