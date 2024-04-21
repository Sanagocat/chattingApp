const express=require("express"); //nodejs server library
const cors = require('cors');

//socket.io : websocket -> FAST Request / Response
const socketIo=require("socket.io"); //websocket -> http websocket 
const http=require("http");
const path=require("path");

const app=express();
app.use(cors());// CORS 설정

const server = http.createServer(app);

//websocket message data get and emit all
const io=socketIo(server);
io.on("connection",function(socket){
    console.log("somebody connected our server!!");
    console.log("FROM IP :"+socket.handshake.address);

    //receive emitted message
    socket.on("chatMessage", function(data){
      console.log("Received Data: " +data);
      //Emit Received Message to All Client
      io.emit("chatMessage", data);
      
    });
  
  }
);


const PORT = 3000;
server.listen(PORT, "0.0.0.0", function(){
    console.log("Server is running on port "+PORT);
});

//default response
app.get("/", (req,res)=> {
  res.send("welcome to chatting Server");
});
