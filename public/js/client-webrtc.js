
function createPeer(){
    var peer = new RTCPeerConnection(iceServers);
    peer.addStream(localStream);
    return peer;
}

function getLocalStream(){
    navigator.mediaDevices.getUserMedia(mediaContraints)
    .then (gotLocalStream)
    .catch(function(error){
        console.log("error getting local stream");
    });
}

function gotLocalStream(stream){
    localStream = stream;
    document.getElementById("selfie").srcObject = localStream;
    document.getElementById("active-speaker").srcObject = localStream;
}

