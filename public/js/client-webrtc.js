
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
        console.log("stream", event.stream);
        if(event.stream){
            document.getElementById("vid-"+userId).srcObject = event.stream;
        }
    };
}

function getLocalStream(){
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
    console.log("sending ice to :"+userId);
    if(event.candidate){
        socket.emit("ice",{
            receiverId : userId,
            ice : event.candidate
        });
    }
}