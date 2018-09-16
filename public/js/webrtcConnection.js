//configuration des servers ice pour la connnection p2p
var peerConnectionConfig = {'iceServers':[
	{'url':'stun:stun.services.mozila.com'},
	{'url':'stun:stun.l.google.com:19302'}
]};

//les contraints sur le stream media à recuperer 
var mediaConstraint={
	video : true,
	audio : true
};

//creation d'un nouveau objet peer connection avec la configuration des ices servers
var localPeerConnection = new RTCPeerConnection(peerConnectionConfig);


var localVideo = document.getElementById("selfie");//la video selfie de l'utilisateur local
var activeSpeaker = document.getElementById("activeSpeaker");//la video de l'utilisateur ayant la main de parler
var videoList = document.getElementById("videoList");//la list des videos dans la conversattion
var usersList = document.getElementById("connectedUsersList");//la list des utilisateur connecter et joignable

//le stream recuperer de la machine local
var localStream;
var activeSpeakerId;



function start(){
 ///
}

//appeler un utilisateur
function call(event){
	var calleeId=event.target.id;
	//....

}


//********************************************************************* *//

//les fonction de webSockets 

//connection ver le serveur sur "http://localhost:3000"
// note : à changer lors de depploiment sur le net et remplacer par l'adresse ip de serveur et le port 
var socket = io.connect('http://localhost:3000');

//recevoir un utilisateur à ajouter à la liste
socket.on('newUser',function(data){
	//ajouter l'utilisateur à la liste des utilisateurs 
	usersList.innerHTML+=addToUsersList(data);
});

//recevoir un apell à partir d'un utilisateur
socket.on('call',function(data){

});

//finir un appel avec un utilisateur
socket.on('hangUp',function(data){
	///
});

socket.on('sdp',function(data){

});


//changer de l'active speaker
socket.on('changeActive',data){

}
//demander la main au moderateur 
function demanderLaMain(){
	//envoyer un message via la socket 
	var data=null;
	socket.emit('ask',data);
}

//**************************************************************** *//
//fonction de la p2p connection


//l'id de l'appellé
var calleeId;
//la fonction qui recuper le stream de la machine local
function getLocalMediaStream(){
	navigator.mediaDevices.getUserMedia(mediaConstraint)
		.then(gotLocalMediaStream)
		.catch(localMediaStreamError);
}

// callBack de la reussite de la recuperation  de stream local
function gotLocalMediaStream(stream){
	localStream = stream;
	localVideo.srcObject = stream;
	activeSpeaker.srcObject = stream;
}

// callBack d'erreur de la recuperation de stream local
function localMediaStreamError(error){
	console.log("error :"+ error);
}

//creation de l'offre webrtc
function createLocalOffer(){
	localPeerConnection.createOffer(gotLOcalDiscription,LocalOfferError);
}

function gotLOcalDiscription(description){
	localPeerConnection.setLocalDescription(description);
	//send the local discription to the other peer
	//...
	socket.emit("sdp",{calleeid:calleeId,sdp:discription});
}

function gotRemoteStream(event){
	//ajouter le stream à la list des video
	//....
}

function gotIceCandidate(event){
	if(event.candidate!=null){
		//sned the ice candidate to the otherpeer
		//...
		socker.emit('ice',event.candidate);
	}
}

function configurePeerConnection(){
	localPeerConnection.onicecandidate=gotIceCandidate;
	localPeerConnection.onaddstream=gotRemoteStream;
}

function LocalOfferError(error){
	console.log("error: "+error);
}
/********************************************************************/
//fonctions de gestion de UI

function addToUsersList(data){
	return "<div class='userListMemeber' id='"+data.userId+"'><button id='user"
		+data.userId+"' class='callButton'>appeler</button>";
}

function highlightActiveUser(){

}

function switchActiveSpeaker(){

}

function ring(){
	//...
}