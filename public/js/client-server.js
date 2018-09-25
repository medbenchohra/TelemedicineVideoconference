socket = io.connect(serverAdress);


socket.on("conversation", function(data){
    addToConversationsList(data.conv);
});

socket.on("joinSuccess", function(data){
    console.log("joined successfully");
    moderator = data.moderator;
});

socket.on("dsp", function(data){
    receivedSdp(data.senderId,data.sdp);
});

socket.on("ice", function(data){
    receivedIceCandidate(data.senderId,data.ice);
});

socket.on("leave", function(data){
    userLeftConversation(data.userId);
});

socket.on("join", function(data){
    userJoinedConversation(data.userId);
});

function addToConversationsList(conversation){
    conversationsList.push(conversation);
    addToConversationsContainer(conversation);
    ///...
    console.log("added conversation to list");
}

function receivedSdp(senderId,sdp){
    var userIndex = getUserIndexById(senderId);
    connectedUsers[userIndex].peer.setRemoteDescription(sdp);
    ///...
    console.log("received session description");
}

function receivedIceCandidate(senderId,ice){
    var userIndex = getUserIndexById(senderId);
    connectedUsers[userIndex].peer.addIceCandidate(ice);
    ///...
    console.log("received ice candidate");
}

function userLeftConversation(userId){
    var userIndex = getUserIndexById(userId);
    connectedUsers[userIndex].peer.close();
    connectedUsers[userIndex]=connectedUsers.pop();
    removeUserVideo(userId);
    ///...
    console.log("user left conversation");
}

function userJoinedConversation(userId){
    addUser(userId);
    addUserVideo(userId);
    ///...
    console.log("user joined conversation");
}


function login(userName,password){
    
    socket.emit('login',{
        userName:userName,
        password:password
    });
}

function join(convId){

    socket.emit('join',{convId:convId});

}

function leave(convId){
    socket.emit('leave',{convId:convId});
}

function logout(){
    socket.emit('logout');
}

function sendSessionDescription(description,receiverId){
    socket.emit('dsp',{
        description : description,
        receiverId : receiver
    });
}

function sendIceCandidate(description,receiverId){
    socket.emit('ice',{
        ice:ice,
        receiverId:receiverId
    });
}
