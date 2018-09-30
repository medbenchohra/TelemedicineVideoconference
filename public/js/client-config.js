
let serverAddress = "192.168.43.86:8080";

let iceServersConfig = {'iceServers':[ 
        {'url':'stun:stun2.l.google.com:19302'},
        {'url':'stun:stun3.l.google.com:19302'},
        {'url':'stun:stun4.l.google.com:19302'},
        {'url':'stun:stunserver.org:3478'},
        {'url':'stun:stun1.l.google.com:19302'},
        {'url':'stun:stun.zadarma.com:3478'},
        {'url':'stun:stun.voipcheap.com:3478'}
    ]};

let mediaConstraints = {
    video : {
        width : 853,
        height : 480
    },
    audio : false
}
