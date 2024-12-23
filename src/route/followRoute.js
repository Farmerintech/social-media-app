import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js"
import { FollowandUnfollow } from "../controller/follow.js"

const FollowRoute = express.Router()


FollowRoute.post('/:username', authMiddleWare, FollowandUnfollow)



 
export default FollowRoute