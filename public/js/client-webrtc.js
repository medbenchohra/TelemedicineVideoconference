
function createPeer(userId){
    console.log("creating peer for user :"+userId);
    var peer = new RTCPeerConnection(null);//iceServersConfig);
    peer.addStream(localStream);
    setPeerListeners(peer, userId);
    return peer;
}

function setPeerListeners(peer, userId){
    peer.onicecandidate = function(event){
        handleIceCandidate(event,userId);
    };
    peer.onaddstream = function(event){
        if(event.stream){
            document.getElementById(userId).srcObject = event.stream;
            var user = getUserIndexById(userId);
            if(user > -1){
                connectedUsers[user].stream = event.stream;
                if (userId == activeSpeakerId) {
                    changeActiveUser(userId);
                }
            }
        }
    };
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then (gotLocalStream)
    .catch(function(error){
        console.log("error getting local stream");
    });
}

function gotLocalStream(stream){
    localStream = stream;
    document.getElementById("selfie").srcObject = localStream;
}

function handleIceCandidate(event,userId){
    if(event.candidate){
        socket.emit("ice",{
            receiverId : userId,
            ice : event.candidate
        });
    }
}