socket = io.connect(serverAddress);

socket.on("loginSuccess", function() {
    console.log("login successfull");
    document.getElementById("my-username").innerHTML = $("#username").val();
    getLocalStream();
    showConversations();
    $("#username").val('');
    $("#password").val('');
});

socket.on("loginFailed", function() {
    console.log("login failed");
    showLoginError();
});

socket.on("user",function(data){
    console.log("got new user "+data.userName);
    addUser(data.userId,data.userName);
    addUserVideo(data.userId);
    changeActiveUser(data.activeUser);
});

socket.on("conversation", function(data){
    console.log("conversation", data.conv);
    addToConversationsList(data.conv);
});

socket.on("joinSuccess", function(data){
    console.log("joined successfully");
    moderator = data.moderator;
    changeActiveUser(data.activeUser);
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

socket.on("leaveConversation", function(data){
    console.log(`user ${data.userId} left the conversation`);
    userLeftConversation(data.userId);
});

socket.on("join", function(data){
    console.log('user joined conversation '+ data.userName);
    userJoinedConversation(data.userId,data.userName);
    changeActiveUser(data.activeUser);
});

socket.on("askPermission", function(data) {
    console.log('someone asked for permission')
    highlightPendingUser(data.userId);
});

socket.on("grantPermission",function(data){
    changeActiveUser(data.userId);
})

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
    if (userIndex !== lastIndex) {
        connectedUsers[connectedUsers.length-1] = connectedUsers.pop();
    }else {
        connectedUsers.pop();
    }
    removeUserVideo(userId);
    console.log(`user ${data.userId} left the conversation`);
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
    currentConversationId = convId;
}

function leaveConversation(convId){
    console.log("someone quit the conversation");
    socket.emit('permissionAsked',{convId:currentConversationId});
}

function logout(){
    console.log("logout");
    socket.emit('logout');
}

function askPermission() {
    console.log("Asking for permission to speak");
    socket.emit('askPermission',{convId:currentConversationId});
}

function grantPermission(userId) {
    console.log("I granted for someone permission to speak");
    socket.emit('grantPermission',{convId:currentConversationId, userId:userId});
}

