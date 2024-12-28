import express from "express"
import { getNotification } from "../controller/notification.js"
import { authMiddleWare } from "../middleware/authMiddleware.js"

const notifyRoute = express.Router()

notifyRoute.get('/',authMiddleWare, getNotification)

export default notifyRoute