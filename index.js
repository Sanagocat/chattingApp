const express = require("express");
const cors = require('cors');
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
app.use(cors()); // CORS 설정

const server = http.createServer(app);

// 웹소켓에 대한 CORS 설정 추가
const io = socketIo(server, {
  cors: {
    origin: "https://chatting-app-front-one.vercel.app", // 허용할 프론트엔드 주소
    methods: ["GET", "POST"]
  }
});

io.on("connection", function(socket){
    console.log("somebody connected our server!!");
    console.log("FROM IP :" + socket.handshake.address);

    socket.on("chatMessage", function(data){
        console.log("Received Data: " + data);
        io.emit("chatMessage", data);
    });
});

const PORT = 3000;
server.listen(PORT, "0.0.0.0", function(){
    console.log("Server is running on port " + PORT);
});

// default response
app.get("/", (req, res) => {
  res.send("welcome to chatting Server");
});
