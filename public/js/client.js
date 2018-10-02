
function user(id,userName,peer){
    this.id = id;
    this.userName = userName;
    this.peer = peer;
    this.stream = null;
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

function addUser(userId,userName){
    console.log("adding user to list");
    var newUser = new user(userId,userName,createPeer(userId));
    connectedUsers.push(newUser);
    return newUser;
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

function sendSDPOffer(receiverId){
    console.log("sending SDP offer");
    var peerr = this.peer;
    peerr.createOffer(function(description){
        peerr.setLocalDescription(description);
        socket.emit("sdp",{receiverId : receiverId,description : description,offer : true});
    },function(error){
        console.log("failed to make an offer");
    });
}

function sendSDPAnswer(receiverId){
    console.log("sending SDP answer");
    var peerr = this.peer;
    peerr.createAnswer(function(description){
        peerr.setLocalDescription(description);
        socket.emit("sdp",{receiverId : receiverId,description : description,offer : false});
    },function(error){
        console.log("creating answer failed");
    });
}

