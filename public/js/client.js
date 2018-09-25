function user(id,peer){
    this.id = id;
    this.peer = peer;

    this.answer = sendSDPAnswer;
    this.offer = sendSDPOffer;
}

function getPeerIndexByUserId(userId){
    var i = 0;
    while((i<connectedUsers.length)&&(connectedUsers[i].id!=userId))i++;
    if(i<connectedUsers.length)return i;
    return -1;
}

function getUserIndexById(userId){
   return getPeerIndexByUserId(userId);
}

function addUser(userId){
    console.log("adding user to list");
    connectedUsers.push(new user(userId,createPeer()));
}

function removeUser(userId){
    console.log("removing user");
    var index = getUserIndexById(userId);
    if(index>-1){
        if(index<connectedUsers.length-1){
            connectedUsers[index]=connectedUsers.pop();
        }else connectedUsers.pop();
    }
}
function createPeer(){

}


function sendSDPOffer(receiverId){
    console.log("sending SDP offer");
    this.peer.createOffer(function(description){
        this.peer.setLocalDescription(description);
        socket.emit("sdpOffer",{receiverId : receiverId,description : description});
    },function(error){
        console.log("failed to make an offer");
    });
}


function sendSDPAnswer(receiverId){
    console.log("sending SDP answer");
    this.peer.creatAnswer(function(description){
        this.peer.setLocalDescription(description);
        socket.emit("sdpAnswer",{receiverId : receiverId,description : description});
    },function(error){
        console.log("creating answer failed");
    })
}

