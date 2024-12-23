import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { getAUser, getUsers } from "../controller/user.js";

const UserRoute = express.Router();

UserRoute.get('/:id', authMiddleWare, getAUser)
.get("/", authMiddleWare, getUsers)
export default UserRoute

