import express from 'express'
import connection from './connection.js'
import env from 'dotenv'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'
import router from  './router.js'


env.config()

const app = express()
const server = http .createServer(app)

// socket.io setup
const io = new Server(server, {
    cors:{
        origin:'*',//frontend origin
        methods:['GET','POST'],
    },
});

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use('/api',router)

io.on("connection",(socket)=>{
    console.log("🟢 user connected:",socket.id);
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("🔴 user disconnected:",socket.id);
        
    })
})



connection()
.then(()=>{
    const PORT = process.env.PORT || 3010
    server.listen(PORT,()=>{
        console.log(`🚀 server started at http://localhost:${PORT}`);

        
    })
}).catch((error)=>{
        console.log(error);
        
    })