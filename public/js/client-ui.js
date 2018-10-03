
//ajouter une conversation a la liste afichee
function addToConversationsContainer(conversation){
    var HTML = "<p class='conversation-title' id='title-"+conversation.id+"'>"+conversation.title+"</p>";
    var HTML = "<div class='conversation' id='conv-"+conversation.id +"'>"+ HTML +"</div>";
    $("#conversations-list").append(HTML);
    $("#conv-"+conversation.id).on('click',function(e){
        onConversation(e.target);
        $("conv-"+conversation.id).css('background-color','red');
    });
}


//ajouter le stream d'un utilisateur à la liste des streams
function addUserVideo(userId){
    $("#video-list").append(
        "<video id='vid-"+userId+"' class='video-item' onclick='onVideoItemClick(this)' autoplay muted playsinline></video>"
    );
}

function onVideoItemClick(target) {
    console.log("I clicked on a user video item");
    if ($("#"+target.id).hasClass("highlighted-pending")) {
        var id = target.id.split("-")[1];
        grantPermission(id);
        $("#"+target.id).removeClass("highlighted-pending");
    }
}

//mettre en evidence l'utilisateur ayant la main (active user)
function highlightActiveUser(exActiveUserId, activeUserId){
    console.log("highlighting active user : ",activeUserId);
    $("#vid-" + exActiveUserId).removeClass("highlighted");
    $("#vid-" + activeUserId).addClass("highlighted");
    if(iAmActiveUser) {
        $("#selfie").hide();
    } else {
        $("#selfie").show();
    }
}

function highlightPendingUser(userId) {
    $("#vid-"+userId).addClass("highlighted-pending");
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

function changeActiveUser(newActiveUser) {
    console.log("changing active user");
    var newUser = getUserIndexById(newActiveUser);
    if(newUser > -1){
        console.log(connectedUsers[newUser].stream);
        document.getElementById("active-speaker").srcObject = connectedUsers[newUser].stream;
        iAmActiveUser = false;
    }else {
        document.getElementById("active-speaker").srcObject = localStream;
        iAmActiveUser = true;
    }
    highlightActiveUser(activeSpeakerId, newActiveUser);
    activeSpeakerId = newActiveUser;
}

function onConversation(conv){
    console.log(conv.id);
    var id = conv.id.split('-')[1];
    console.log("id = "+id);
    var convId = parseInt(id);
    console.log("requesting to join conversation "+convId);
    join(convId);
}


//--------------------------------------------------------------------------
$('.validate-form .input100').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
});

function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == ''){
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}
///----------------------------------------------------------------------------

function onLogIn(){
   var input = $('.validate-input .input100');
   var check = true;

    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }
    if(check) {
        var userName = $("#username").val();
        var passWord = $("#password").val();
        login(userName,passWord);
    }
}

function onLogOut(){
    $("#login").prop("disabled",false);
    $("#logout").prop("disabled",true);
}


function setEventListeners(){
    $("#login").on('click',onLogIn);
    $("#logout").on('click',onLogOut);
    $("#ask-permission").on('click',askPermission);

}


function showSignIn(){
    $("#sign-in").show();
    $("#conference").hide();
    $("#conversations").hide();
}

function showConference(){
    $("#conference").show();
    $("#sign-in").hide();
    $("#conversations").hide();
}

function showConversations(){
    $("#conference").hide();
    $("#sign-in").hide();
    $("#conversations").show();
}

function showLoginError(){
    $("#login-error").show();
}

function hideLoginError(){
    $("#login-error").hide();
}

function setElementSizes(){
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    
}