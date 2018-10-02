let socket;
let peerConnections = [];
let currentConversationId = null;
let conversationsList = [];
let activeSpeakerId = null;
let conversationsContainer = null;
let connectedUsers = [];
let localStream;
let moderator = false;