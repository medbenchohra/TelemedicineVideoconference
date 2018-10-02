
<<<<<<< HEAD

//let serverAddress = "https://<server>:8080";//connexion web
//let serverAddress = "http://localhost:8080";//connection localhost
let serverAddress = "192.168.43.52:8080";//connexion local
=======
let serverAddress = "localhost:8080"; // using local network
// const serverAddress = process.env.serverAddress; //using environment variable
// let serverAddress = "localhost:8080"; // using localhost

>>>>>>> client_ui

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
    audio : true
}
