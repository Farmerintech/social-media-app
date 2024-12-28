import express from "express"
import cors from "cors"
import { connectDB } from "./src/config/db.js";
import AuthRoute from "./src/route/authRoute.js";
import ProfileRoute from "./src/route/profileRoute.js";
import postRoute from "./src/route/postRoute.js";
import commentRoute from "./src/route/commentRoute.js";
import FollowRoute from "./src/route/followRoute.js";
import UserRoute from "./src/route/userRoute.js";
import LikeRoute from "./src/route/likeRoute.js";
import ChatRoute from "./src/route/chatRoute.js"; 
import http from 'http';
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from "url";
import notifyRoute from "./src/route/notifyRoute.js";

const app = express();
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
connectDB()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Vite's default development server URL
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use('/api/v1/auth', AuthRoute)
app.use ('/api/v1/profile', ProfileRoute)
app.use ('/api/v1/posts', postRoute)
app.use('/api/v1/posts', commentRoute)
app.use("/api/v1/follow", FollowRoute)
app.use("/api/v1/users", UserRoute)
app.use("/api/v1/like", LikeRoute)
app.use("/api/v1/chats", ChatRoute)
app.use("/api/v1/notifications", notifyRoute)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use(express.static(path.join('client/dist')))
app.get('*', (req, res) =>{
    res.sendFile(path.join('/client/dist/index.html'))
})
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
