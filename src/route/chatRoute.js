import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js"
import { getChats, PostChat } from "../controller/chat.js"

const ChatRoute = express.Router()

ChatRoute.post("/:receiverId", authMiddleWare, PostChat)
ChatRoute.get("/", authMiddleWare, getChats)

export default ChatRoute