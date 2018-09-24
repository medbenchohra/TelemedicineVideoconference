function user(id,peer){
    this.id = id;
    this.peer = peer;
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
    connectedUsers.push(new user(userId,createPeer()));
}

function createPeer(){

}