
//ajouter une conversation a la liste afichee
function addToConversationsContainer(conversation){
    $("#conversations-list").append(
        "<div id='conv-"+conversation.id+"' class='conversation'> <p><strong>"+conversation.title+"</strong></p></div>");
}


//ajouter le stream d'un utilisateur à la liste des stream
function addUserVideo(userId){
    $("#video-list").append(
        "<video id='vid-"+userId+"' class='video-item' autoplay playsinline></video>"
    );
}

//metre en evidence l'utilisateur ayant la main
function highlightActiveUser(exActiveUserId,activUserId){
    $("#vid-"+activUserId).css("box-shadow","#0aff00");
    $("#vid-"+exActiveUserId).css("box-shadow","");
}

//suprimer le stream d'un utilisateur
function removeUserVideo(userId){
    $("#video-list").remove("#vid-"+userId);
}

//retirer une conversation de la list affichee
function removeConversation(convId){
    $("#conv-"+convId).remove();
}

//cacher la liste des conversation
function hideConverationList(){
    $("#converations-list").hide();
}

//affichee la liste des conversation 
function showConversationList(){
    $("#conversations-list").show();
}


function setEventLisners(){

}