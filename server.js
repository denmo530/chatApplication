const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
io.on("connection", (socket) => {
  socket.emit("message", "Welcome to Denkan's chat!");

  //Broadcast when user connects
  socket.broadcast.emit("message", "A user has joined the chat!");

  //run when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat.");
  });

  //Listen for chat message
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
