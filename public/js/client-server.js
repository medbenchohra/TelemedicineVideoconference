socket = io.connect(serverAddress);

socket.on("loginSuccess", function() {
    console.log("login successfull");
    getLocalStream();
    showConversations();
});

socket.on("loginFailed", function() {
    console.log("login failed");
    showLoginError();
});

socket.on("user",function(data){
    console.log("got new user "+data.userName);
    addUser(data.userId,data.userName);
    addUserVideo(data.userId);
});

socket.on("conversation", function(data){
    console.log("conversation", data.conv);
    addToConversationsList(data.conv);
});

socket.on("joinSuccess", function(data){
    console.log("joined successfully");
    moderator = data.moderator;
    showConference();
});

socket.on("sdp", function(data){
    console.log('received SDP');
    receivedSdp(data.senderId,data.description,data.offer);
});

socket.on("ice", function(data){
    console.log('received ICE');
    receivedIceCandidate(data.senderId,data.ice);
});

socket.on("leave", function(data){
    console.log('user left conversation');
    userLeftConversation(data.userId);
});

socket.on("join", function(data){
    console.log('user joined conversation '+ data.userName);
    userJoinedConversation(data.userId,data.userName);
});

function addToConversationsList(conversation){
    conversationsList.push(conversation);
    addToConversationsContainer(conversation);
    ///...
    console.log("added conversation to list");
}

function receivedSdp(senderId,description,offer){
    var userIndex = getUserIndexById(senderId);
    connectedUsers[userIndex].peer.setRemoteDescription(description);
    ///...
    if(offer) 
        connectedUsers[userIndex].answer(senderId);
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

function userJoinedConversation(userId,userName){
    var user = addUser(userId,userName);
    addUserVideo(userId);
    ///...
    user.offer(userId);
    console.log("user joined conversation");
}


function login(userName,password){
    console.log('login ');
    socket.emit('login',{
        userName:userName,
        password:password
    });
}

function join(convId){
    console.log('joining conversation');
    socket.emit('join',{convId:convId});

}

function leave(convId){
    console.log('leaving Conversation');
    socket.emit('leave',{convId:convId});
}

function logout(){
    console.log("logout");
    socket.emit('logout');
}


