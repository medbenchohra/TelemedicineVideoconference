var express = require('express');
var SIO = require('socket.io');

var users=[];
var sockets=[];
var conversation=[];

var app = express();

var server = app.listen(3000,function(){
    console.log("started listening on port 3000");
});

app.use(express.static("public"));

var io = SIO(server);
///***********************************************************************

io.on('connection',function(socket){
    
    //ajouter la socket à la liste des sockets
    sockets[sockets.length]=socket;
    console.log('a user is connected');
    

    //ajouter un listner pour les utilisateurs qui ce connect
    socket.on("newUser",function(data){
        if(data){
            users[users.length] = new User(data.name,users.length);
            socket.broadcast.emit('newUser',{id:socket.id,name : data.name});
            console.log("new user :"+data.name+", id :"+socket.id);
            sendListUsers(socket);
        }
    });

    //ajouter un listner pour les appels
    socket.on("call",function(data){
        //à verifier
        var i=0;
        while((i<users.length)&&(data.calleeId!=users[i].id)){i++;}
        if(i<users.length){
            socket[i].emit("call",{callerId:socket.id, description:data.description});
        }else{console.log('l utilisateur n''existe pas')}
        //....
    });

    //ajouter un listner pour la reponse à un appel 
    socket.on('respond',function(data){
        //à verifier
        var i=0;
        while((i<users.length)&&(data.calleeId!=users[i].id)){i++;}
        if(i<users.length){
            if(data.answer==true){
                socket[data.colleeId].emit('respond',colleeId:data.collerId,description:data.description,answer:data.answer);
            }else{
                 socket[data.colleeId].emit('respond',colleeId:data.collerId,description:data.description,answer:data.answer);
            }
        }
        //...
    });

    //ajouter un listner pour le transfert des discription 
    socket.on('sdp',function (data){

    });

    //ajouter unn  listner pour le transfert des candidat ice
    socket.on('ice',function(data){

    });

    socket.on('')
});


//creation d'unn nouveau utilisateur
function User(name,id){
    this.name=name;
    this.id=id;
}

//chercher une socket par l'id de son propriétaire
function getSocketByUserID(id){
    var i=0;
    while((i<users.length)&&(id!=sockets[i].id)){i++;}
    if(i<users.length)return sockets[i];
    return null;
}

//envoyer la liste des utilisateurs deja connectés au nouveau utilisateur 
function sendUsersList(socket){
   users.forEach(user => {
       socket.emit("newUser",user);
   };
}




//creer une nouvel conversassion entre deux ou plus utilisateurs
function conversation(conversationId,moderatorId){
    this.conversationId=convId;
    this.moderatorId=moderatorId;
    this.participents=[];
}
function medecin();

function patient();

function call(callerId,calleeId,description){
         
        socket =findSocket(calleeId);
        socket.emit('call',{callerid:callerid,description:description});
}

function login(){}

function hangup(collerId){

    var conversattion = findConversationById(callerId);
    forEach(var participant in conversation.participants){
       
       if(participant!=collerId){
            soket=findSocket(conversation.participants[participant]);
            socket.emit('hangup',{callerId:callleerId});
        }
    }
}


function pickup(colleeId,description){
    if(socket=findSocket(colleeId)){
          
          socket.emit('pickup',{description:description,collerId:collerId});
         

    }

function reject(colleeId)

{
    if(socket=findSocket(colleeId))
    {
       socket.emit('reject',{colleeId:colleeId});
    }

}


function ice(colleeId,){
    if(socket=findSocket(colleeId)){

         socket.emit('ice',{ice:ice})

    }

}

}

function (colleeId)
{
    
     
     
}
function findSocket();
function removeUser();
function userLogout();
function userLogin();
function updateList();
function findUser();
function dsp(colleeId,description)
{


   socket=findSocket(colleeId);
   socket.emit()



}