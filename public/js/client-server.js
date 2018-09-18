

/* calls calleeId
    @params
      calleeId : id of the person to be called
      description : browser description of the caller
*/
function call(calleeId, description) {
  socket.emit("call",{
    calleeID: calleeID,
    description: description
  });
}

function pickup(callerId, description) {
  socket.emit("pickup", {
    callerId: callerId,
    description: description
  });
}

function hangup(callerId) {
  socket.emit("hangup", {
    calledId: callerId
  });
}

function reject(callerId) {
  socket.emit("reject", {
    callerId: callerId
  });
}

function login(firstName, lastName, speciality) {
  socket.emit("login", {
    firstName: firstName,
    lastName: lastName,
    speciality: speciality
  });
}

function logout() {
  socket.emit("logout", {});
}

/* ======================= Events Listeners =============================== */

socket.on("call",ring);
socket.on("pickup",handlePickup);
socket.on("hangup",handleHangup);
socket.on("reject",handleReject);
socket.on("login",handleLogin);
socket.on("logout",handleLogout);

/* ======================= Events Handlers =============================== */

function ring(data) {

}


function handlePickup(data) {

}


function handleHangup(data) {

}


function handleReject(data) {

}


/* ======================= Helpers ======================================== */


















.
