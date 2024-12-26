import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js"
import { LikeAndUnlike } from "../controller/like.js"

const LikeRoute = express.Router()


LikeRoute.post('/:postId', authMiddleWare, LikeAndUnlike)



 
export default LikeRoute