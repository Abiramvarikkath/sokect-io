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
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',//frontend origin
        methods:['GET','POST'],
    },
});

io.on("connection",(socket)=>{
    console.log("user connected:",socket.id);
    socket.on("sendMessage",(data)=>{
        io.emit("recieveMessage",data)
    })
    socket.on("disconect",()=>{
        console.log("user disconnected:",socket.id);
        
    })
})

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use('/api',router)

connection()
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server started at http://localhost:${process.env.PORT}`);

        
    })
}).catch((error)=>{
        console.log(error);
        
    })