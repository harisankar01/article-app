const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:["http://localhost:3000"],
    }
});
io.on("connection",Socket=>{
    Socket.on("event",(msg,lock,title)=>{
        console.log(msg);
        Socket.broadcast.emit("reciever",msg,lock,title);
    })
})

http.listen(4000,()=>{
    console.log("listerning on 4000");
})  