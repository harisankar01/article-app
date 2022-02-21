const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:"http://localhost:3000",
        allowedHeaders: ["Access-Control-Allow-Origin"],
    },
    Headers:{
        "Access-Control-Allow-Origin":true,
        "Access-Control-Allow-Origin": "https://author-admin-app.herokuapp.com"
    }
});
io.on("connection",Socket=>{
    // io.set("transports", ["xhr-polling"]); 
    // io.set("polling duration", 10); 
    Socket.on("event",(msg,lock,title)=>{
        Socket.broadcast.emit("reciever",msg,lock,title);
    })
})
 
http.listen(process.env.PORT || 5000);