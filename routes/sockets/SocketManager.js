const socketIO = require("socket.io");
const io = require("../../server.js");

module.exports = function(socket) {
  console.log("socket manager connected, id: " + socket.id);

  socket.on("chat", text => {
    console.log("test recieved", text);
    io.io.sockets.emit("NEW_CHAT", text);
  });
};
