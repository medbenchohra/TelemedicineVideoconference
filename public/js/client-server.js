

/* calls calleeID
    @params
      calleeID : id of the person to be called
      desciption : browser desciption of the caller
*/
function call(calleeID, desciption) {
  socket.emit("call",{
    calleeID: calleeID,
    desciption: desciption
  });
}

function pickup() {
  
}
